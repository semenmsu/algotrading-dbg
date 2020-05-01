#!/bin/bash

function usage()
{
cat << EOF
USAGE: $FUNCNAME [OPTIONS] [TEXT]

OPTIONS

    -a  amount of instrument
    -p  price of instrument
    -s  symbol of instrument
    -t  ordertype

    --amount  Same as -a
    --price   Same as -p
    --symbol    Same as -s
    --typeorder  Same as -t
    --no-verbose don't print debug information

EOF
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

#defaults
verbose="--verbose"


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
    --no-verbose)
    verbose="--no-verbose"
    shift 
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
echo "AMOUNT    : $amount"
echo "PRICE     : $price"
echo "TYPEORDER : $typeorder"
echo "VERBOSE   : $verbose"
set -- "${POSITIONAL[@]}" # restore positional parameters


