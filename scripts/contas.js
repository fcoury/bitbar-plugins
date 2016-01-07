const Excel = require('exceljs');
const moment = require('moment');

var workbook = new Excel.Workbook();
var bills = {};

workbook.xlsx.readFile('/Users/fcoury/Dropbox/Despesas-Principal.xlsx')
.then(function(workbook) {
  var sheet = workbook.getWorksheet('Current');
  var rowNum = 2;

  while (true) {
    var row = sheet.getRow(rowNum);
    var title = row.getCell(1).value;
    var day = row.getCell(3).value;

    if (!title) {
      break;
    }

    if (!bills[day]) {
      bills[day] = [];
    }

    bills[day].push(title);
    rowNum += 1;
  }

  var selBills = bills[moment().format('d')];
  // var selBills = bills['15'];

  if (selBills) {
    var d = selBills[0];
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
});
