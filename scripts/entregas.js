const request = require('request');
const moment = require('moment');
const cheerio = require('cheerio');
const _ = require('lodash');

function getStatus(id) {
  var url = `http://websro.correios.com.br/sro_bin/txect01$.ResultList?P_ITEMCODE=${id}&P_LINGUA=001&P_TIPO=003&Z_START=&Z_ACTION=`;
  request(url, function(error, response, body) {
    var $ = cheerio.load(body);
    var rows = $('table tr');
    var cols = $('td', rows[1]);
    var status = $(cols[2]).text();

    console.log(`${id} - ${status}`)
  });
}

getStatus("LB501955855SE");
getStatus("LB501981095SE");
getStatus("LB501981422SE");
getStatus("LB501981555SE");
getStatus("LB502052931SE");
