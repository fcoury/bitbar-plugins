#!/usr/bin/env bash

#
# Cotação
# 
# Retrieves Dolar and Bovespa exchange rates.
#
# Dependencies:
# brew install node
# brew install jsawk
# brew install spark
# brew install pup
#

export PATH=${PATH}:/usr/local/bin

#
# Cotação Dólar
#
JSON=`curl -s http://developers.agenciaideias.com.br/cotacoes/json`
COT=`echo $JSON | /usr/local/bin/jsawk "return this.dolar.cotacao;"`
VAR=`echo $JSON | /usr/local/bin/jsawk "return this.dolar.variacao;"`
SIG="▲"
if [[ ${VAR:0:1} == "-" ]]; then
  SIG="▼"
fi
VAR=`printf "%0.2f" "$COT"`
VAR=`echo "$VAR" | tr . ,`

# Cotação principal
DOLAR=`echo "USD \\$${VAR} ${SIG}"`

# Cotação principal
COT=`curl -s 'http://cotacoes.economia.uol.com.br/cambio/cotacoes-diarias.html?cod=BRL&size=200&' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: en-US,en;q=0.8,pt-BR;q=0.6,pt;q=0.4' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Referer: http://cotacoes.economia.uol.com.br/cambio/cotacoes-diarias.html?cod=BRL&size=200&' -H 'Cookie: DNA=be10badd598f4a9d8c6ac4577b7c9986|null|true; dynad_rt=2015081701; DEretargeting=2015081701%3B501; _ga=GA1.3.1510035125.1449376362; s_pers=%20s_visit%3D1%7C1450838183679%3B%20s_fid%3D61FD7C517A79DA2E-11D26B15D0D2AC9A%7C1514487403929%3B; geoloc=SA%2CBR%2C27%2CCampinas%2CSP; UOL_VIS=B|179.111.87.201|1449602298.68662|1451912707; s_getNewRepeat=1451926182961-Repeat; s_ppvn=13%7C0; s_ppv=13%7C0; s_cc=true; s_sq=%5B%5BB%5D%5D; s_vi=[CS]v1|2B31DD1B051D0D72-4000190F6000716E[CE]; BTCTL=be; BT=%3B212%3B; s_fid=003CC6EC9E8F9B80-01265107B3762B55; s_visit=1' -H 'Connection: keep-alive' -H 'Cache-Control: no-cache' --compressed`
COT=`echo "$COT" | pup "table tbody:nth-child(2) tr json{}" | jsawk 'return this.children[1].text'`

# Sparkline do dolar intraday
SPARK=`echo "var cot=$COT; cot.shift(); var cots = ''; var cnt=Math.min(cot.length, 10); for (var i=0; i < cnt; i++) { cots += cot[i].replace(',', '') + ' ' }; console.log(cots);" | node | spark`

#
# Cotação Bovespa
#
COT=`echo $JSON | /usr/local/bin/jsawk "return this.bovespa.cotacao;"`
VAR=`echo $JSON | /usr/local/bin/jsawk "return this.bovespa.variacao;"`
SIG="▲"
if [[ ${VAR:0:1} == "-" ]]; then
  SIG="▼"
fi
BOVESPA=`printf "Bovespa %s ${SIG} %0.2f\n" "$COT" "$VAR"`

echo $DOLAR
echo "---"
echo $SPARK
echo "---"
echo $BOVESPA
