#!/bin/bash

. credentials/api_keys #load API_KEY and SECRET

TIME_IN_MKS=$(expr `date +%s%N` / 1000)
HOST="https://api.bitfinex.com/"
URL_PATH="v2/auth/calc/order/avail"
URL="$HOST$URL_PATH"
NONCE=$TIME_IN_MKS
BODY='{"symbol":"tBTCUSD","dir":1,"rate":"800","type":"EXCHANGE"}'
SIGNATURE="/api/$URL_PATH$NONCE$BODY"
SIG=$(echo -n $SIGNATURE | openssl dgst -sha384 -hmac $SECRET | sed 's/^.* //')
echo $SIGNATURE
echo $SIG

echo $BODY
#exit 0
curl --trace-ascii log/balance_available_for_orders_orders_auth.log \
    -H "bfx-nonce: $NONCE" \
    -H "bfx-apiKey: $API_KEY" \
    -H "bfx-signature: $SIG" \
    -H "Content-Type: application/json" \
    -d $BODY \
    -X POST $URL \
    
