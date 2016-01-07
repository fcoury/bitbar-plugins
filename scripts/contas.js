// const Excel = require('exceljs');
const XLSX = require('xlsx');
const moment = require('moment');

var workbook = new XLSX.readFile('/Users/fcoury/Dropbox/Despesas-Principal.xlsx');
var bills = {};

var sheet = workbook.Sheets['Current'];
var rowNum = 2;
while (true) {
  if (!sheet['A' + rowNum]) {
    break;
  }

  var title = sheet['A' + rowNum].v;
  var day = sheet['C' + rowNum].v;

  if (!title) {
    break;
  }

  if (!bills[day]) {
    bills[day] = [];
  }

  bills[day].push(title);
  rowNum += 1;
}

var selBills = bills[parseInt(moment().format('D'))];

if (selBills) {
  var d = selBills[0];
  var i = d.indexOf('(');
  if (i > -1) {
    d = d.substring(0, i-1);
  }
  if (selBills.length > 1) {
    d += ' +' + (selBills.length-1)
  }
  console.log(d);
  console.log('---');

  for (var i = 1; i < selBills.length; i++) {
    var bill = selBills[i];
    console.log(bill);
  }
}
else {
  console.log('-');
  console.log('---');
  console.log('Nenhuma conta hoje');
}
