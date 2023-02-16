#!/bin/bash
startPort="4566"
endPort="4571"

echo "Starting LocalStack on http://localhost:$startPort/"
docker run --rm -it -p $startPort:$startPort -p $endPort:$endPort localstack/localstack DYNAMODB_SHARE_DB=1
