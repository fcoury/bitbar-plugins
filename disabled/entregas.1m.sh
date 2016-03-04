#!/bin/bash

export PATH=${PATH}:/usr/local/bin

source $(dirname $0)/scripts/.env

node $(dirname $0)/scripts/entregas.js
