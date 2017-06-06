#!/bin/bash

export PATH=${PATH}:/usr/local/bin

source $(dirname $0)/scripts/.env

node --no-warnings $(dirname $0)/scripts/contas.js
