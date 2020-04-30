#!/bin/bash

. credentials/api_keys #load API_KEY and SECRET

TIME_IN_MKS=$(expr `date +%s%N` / 1000)
HOST="https://api.bitfinex.com/"
URL_PATH="v2/auth/r/positions"
URL="$HOST$URL_PATH"
NONCE=$TIME_IN_MKS
BODY=''
SIGNATURE="/api/$URL_PATH$NONCE$BODY"
SIG=$(echo -n $SIGNATURE | openssl dgst -sha384 -hmac $SECRET | sed 's/^.* //')
echo $SIGNATURE
echo $SIG

#exit 0
curl --trace-ascii log/positions_auth.log \
    -H "bfx-nonce: $NONCE" \
    -H "bfx-apiKey: $API_KEY" \
    -H "bfx-signature: $SIG" \
    -H "Content-Type: application/json" \
    -X POST $URL \
    
