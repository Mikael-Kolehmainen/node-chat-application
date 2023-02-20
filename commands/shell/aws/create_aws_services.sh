#!/bin/bash
port="4566"

sleep 5
# DynamoDB #
file="file://db/messages.json"
echo "Creating DynamoDB table based on $file at port $port"
aws --endpoint-url=http://localhost:$port dynamodb create-table --cli-input-json file://db/messages.json --region us-east-1
echo \

echo "Showing created table"
aws --endpoint-url=http://localhost:$port dynamodb list-tables
echo \

# S3 #
bucketName="chat-images"
echo "Creating S3 bucket called $bucketName"
aws --endpoint-url=http://localhost:$port s3api create-bucket --bucket $bucketName
echo \

echo "Listing the created S3 bucket"
aws --endpoint-url=http://localhost:$port s3api list-buckets
echo \

# Lambda #
echo "Creating zip of resize-image Lambda"
zip -r ./server/lambda/resize-image.zip ./server/

echo "Creating resize-image Lambda"
aws --endpoint-url=http://localhost:4566 lambda create-function --function-name lambda-resize-image --zip-file fileb://server/lambda/resize-image.zip --handler ./server/lambda/resize-image.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role

echo "Attaching trigger to resize-image Lambda"
aws --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket $bucketName --notification-configuration file://server/lambda/resize-image-trigger-config.json

