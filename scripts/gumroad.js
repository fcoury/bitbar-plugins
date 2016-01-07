const request = require('request');
const moment = require('moment');
const _ = require('lodash');

const TOKEN = process.env.GUMROAD_TOKEN;

var sales = [];
var lastSale = null;

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function requestPage(page, callback) {
  var today = moment().format('YYYY-MM-DD');
  var url = 'https://api.gumroad.com/v2/sales' +
    '?access_token=' + TOKEN +
    '&after=' + today +
    '&page=' + page;

  request(url, function(error, response, body) {
    var res = JSON.parse(body);
    var thisSales = res.sales;

    for (var i = 0; i < thisSales.length; i++) {
      var sale = thisSales[i];
      // console.log(sale.product_name + ' - ' + sale.created_at);
      if (sale.product_name.indexOf('ng-book 2') > -1) {
        sales.push(sale);
      }
      if (lastSale == null) {
        lastSale = sale;
      }
      else {
        var lastDate = moment(lastSale.created_at);
        var currDate = moment(sale.created_at);

        if (currDate > lastDate) {
          lastSale = sale;
        }
      }
    }

    if (res.next_page_url) {
      requestPage(page + 1, callback);
    }
    else {
      callback(sales);
    }
  });
}

requestPage(1, function(sales) {
  var total = _.inject(sales, function(t, n) {
    return t + n.price;
  }, 0);
  console.log(
    '$' + (total / 100).formatMoney(0, '.', ',') +
    ' (' + sales.length + ')');
  console.log('---');

  var lastDate = moment(lastSale.created_at);
  console.log('Last sale: ' + lastDate.format('h:mm A') +
    ' (' + lastDate.fromNow() + ')');
});
