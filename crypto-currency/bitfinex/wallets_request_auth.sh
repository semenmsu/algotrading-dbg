#!/bin/bash

. credentials/api_keys #load API_KEY and SECRET

TIME_IN_MS=$(expr `date +%s%N` / 100000)
HOST="https://api.bitfinex.com/"
URL_PATH="v2/auth/r/wallets"
URL="$HOST$URL_PATH"
NONCE=$TIME_IN_MKS
BODY=""
SIGNATURE="/api/$URL_PATH$NONCE$BODY"
SIG=$(echo -n $SIGNATURE | openssl dgst -sha384 -hmac $SECRET | sed 's/^.* //')
echo $SIGNATURE
echo $SIG

curl --trace-ascii wallets_request_auth.log --insecure \
    -H "bfx-nonce: $NONCE" \
    -H "bfx-apiKey: $API_KEY" \
    -H "bfx-signature: $SIG" \
    -X POST $URL \
    #-d $BODY
