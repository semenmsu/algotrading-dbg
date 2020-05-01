#!/bin/bash


. credentials/api_keys #load API_KEY and SECRET
. scripts/argparse.sh "$@"

VERBOSE=$verbose
ACCOUNT=$account
TRACE=$trace
TRACE_LOG="log/auth_wallets_request.log"

TIME_IN_MKS=$(expr `date +%s%N` / 1000)
HOST="https://api.bitfinex.com/"
URL_PATH="v2/auth/r/wallets"
URL="$HOST$URL_PATH"
NONCE=$TIME_IN_MKS
BODY=""
SIGNATURE="/api/$URL_PATH$NONCE$BODY"
SIG=$(echo -n $SIGNATURE | openssl dgst -sha384 -hmac $SECRET | sed 's/^.* //')

verbose
trace

curl $TRACE \
    -H "bfx-nonce: $NONCE" \
    -H "bfx-apiKey: $API_KEY" \
    -H "bfx-signature: $SIG" \
    -H "Content-Type: application/json" \
    -X POST $URL

exit 0

