#!/usr/bin/env bash

#
# Timezones
# 
# Display times in other timezones
#
# Dependencies:
# brew install node
# npm install moment
# npm install moment-timezone
#

export PATH=${PATH}:/usr/local/bin

getTime() {
  TZ="$2"
  MOMT="`dirname $0`/node_modules/moment-timezone"
  
  RES=`echo "var m=require('${MOMT}'); console.log(m().tz('$2').format('h:mm A'))" | node`
  if [ ! -z "$3" ]; then
    echo "$1" "$RES"
  else
    echo "$RES"
  fi
}

getTime "Glendale" "America/Los_Angeles"
echo "---"
getTime "Miami" "America/New_York" 1
echo "---"
getTime "Campinas" "America/Sao_Paulo" 1
