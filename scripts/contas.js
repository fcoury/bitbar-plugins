// const Excel = require('exceljs');
const XLSX = require('xlsx');
const moment = require('moment');

function printBills(day, bills, skipHighlight) {
  if (bills) {
    if (!skipHighlight) {
      var d = bills[0];
      var i = d.indexOf('(');
      if (i > -1) {
        d = d.substring(0, i-1);
      }
      if (bills.length > 1) {
        d += ' +' + (bills.length-1)
      }
      console.log(d);
      console.log('---');
    }

    if (bills.length > 1) {
      console.log(day);

      for (var i = 0; i < bills.length; i++) {
        var bill = bills[i];
        console.log(bill + '| color=blue');
      }
    }
  }
  else {
    console.log('-');
    console.log('---');
    console.log('No bills');
  }
}

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

var today = parseInt(moment().format('D'));
var tomorrow = parseInt(moment().add(1, 'days').format('D'));
var selBills = bills[today];
var tomBills = bills[tomorrow];

printBills('TODAY', selBills);

console.log('---');
if (tomBills) {
  printBills('TOMORROW', tomBills, true);
}
else {
  console.log('TOMORROW');
  console.log('No bills')
}
