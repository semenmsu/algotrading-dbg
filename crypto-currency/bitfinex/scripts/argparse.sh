#!/bin/bash

function usage()
{
cat << EOF
USAGE: ./\$script_name [options...]

OPTIONS:

    -a , --amount      amount of instrument
    -p , --price       price of instrument
    -s , --symbol      symbol of instrument (tBTCUSD), depend from exchange
    -t , --typeorder   ordertype (LIMIT, MARKET), depend from exchange
         --account     what account to use
         --no-verbose  don't print debug inforamtion
         --trace       log request/response to file (default: trace-ascii, no - for not using)
EOF
}

function trace() {
    if [ "$TRACE" = "--no" ]; then
        TRACE=""
    fi

    if [ "$TRACE" = "--trace-ascii" ]; then
        TRACE="$TRACE $TRACE_LOG"
    fi
}

function verbose() {
if [ "$VERBOSE" = "--verbose" ]; then
    echo "SIGNATURE: $SIGNATURE"
    echo "SIG      : $SIG"
    echo "TRACE    : $TRACE"
fi
}

#defaults
verbose="--verbose"
trace="--trace-ascii"


POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"




case $key in
    -h|--help)
    usage
    exit 1
    ;;
    -a|--amount)
    amount="$2"
    shift
    shift
    ;;
    -p|--price)
    price="$2"
    shift
    shift
    ;;
    -t|--typeorder)
    typeorder="$2"
    shift
    shift
    ;;
    --trace)
    trace="--$2"
    shift
    shift
    ;;
    --no-verbose)
    verbose="--no-verbose"
    shift 
    ;;
    --account)
    account=$2
    shift 
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters


