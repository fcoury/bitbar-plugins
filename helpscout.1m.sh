#!/usr/bin/env bash

export PATH=${PATH}:/usr/local/bin
source $(dirname $0)/scripts/.env

MAILBOX=`curl -s -u "${HELPSCOUT_API}:X" https://api.helpscout.net/v1/mailboxes/${HELPSCOUT_MAILBOX_ID}.json`
UNASSIGNED=`echo ${MAILBOX} | jsawk 'return this.item.folders[0].totalCount'`
MINE=`echo ${MAILBOX} | jsawk 'return this.item.folders[1].totalCount'`
SUM=$(($UNASSIGNED + $MINE))

if (( SUM > 0 )); then
  echo "📬 ${SUM}"
else
  echo "📭"
fi

echo "---"
echo "Unassigned: ${UNASSIGNED}"
echo "Mine: ${MINE}"
