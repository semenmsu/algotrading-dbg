#!/bin/bash

curl --trace-ascii log/trades.log https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist
