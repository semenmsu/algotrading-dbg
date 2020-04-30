#!/bin/bash

curl --trace-ascii log/tickers.log https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,fUSD