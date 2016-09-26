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
    var location = $(cols[1]).text();
    var status = $(cols[2]).text();
    var city = location.split('-')[1];

    console.log(`${city}`)
    console.log('---');
    console.log(`${id} - ${status} - ${location} | color=blue href=http://websro.correios.com.br/sro_bin/txect01%24.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=${id}`);
  });
}

getStatus("CF221083624US");
