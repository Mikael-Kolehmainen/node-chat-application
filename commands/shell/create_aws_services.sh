#!/bin/bash
port="4566"
file="file://messages.json"

echo "Creating DynamoDB table based on $file at port $port"
aws --endpoint-url=http://localhost:$port dynamodb create-table --cli-input-json $file --region us-east-1
echo \

echo "Showing created table"
aws --endpoint-url=http://localhost:$port dynamodb list-tables
echo \

bucketName="chat-image"
echo "Creating S3 bucket called $bucketName"
aws --endpoint-url=http://localhost:$port s3api create-bucket --bucket $bucketName
echo \

echo "Listing the created S3 bucket"
aws --endpoint-url=http://localhost:$port s3api list-buckets
echo \
