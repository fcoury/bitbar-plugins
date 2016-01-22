#!/bin/bash

export PATH=${PATH}:/usr/local/bin
source $(dirname $0)/scripts/.env
node --harmony $(dirname $0)/scripts/helpscout.js
