#!/bin/bash

. credentials/api_keys #load API_KEY and SECRET

TIME_IN_SEC=$(expr `date +%s`)
TIME_IN_MKS=$(expr `date +%s%N` / 1000)
HOST="https://api.bitfinex.com/"
URL_PATH="v2/auth/w/order/cancel"
URL="$HOST$URL_PATH"
NONCE=$TIME_IN_MKS
ORDER_ID=44464859873
BODY="{\"id\":$ORDER_ID}"
SIGNATURE="/api/$URL_PATH$NONCE$BODY"
SIG=$(echo -n $SIGNATURE | openssl dgst -sha384 -hmac $SECRET | sed 's/^.* //')
echo $BODY
echo $SIGNATURE
echo $SIG

curl --trace-ascii log/auth_cancel_order.log \
    -H "bfx-nonce: $NONCE" \
    -H "bfx-apiKey: $API_KEY" \
    -H "bfx-signature: $SIG" \
    -H "Content-Type: application/json" \
    -d "$BODY" \
    -X POST $URL
    
