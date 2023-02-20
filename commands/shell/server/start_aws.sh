#!/bin/bash
startPort="4566"
endPort="4571"

docker run --rm -it -p $startPort:$startPort -p $endPort:$endPort localstack/localstack DYNAMODB_SHARE_DB=1
