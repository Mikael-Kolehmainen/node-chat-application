#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
source $SCRIPTPATH/../const.sh

sleep 5
# DynamoDB #
file="file://db/messages.json"
echo "Creating DynamoDB table based on $file at port $port"
aws --endpoint-url=$endpointUrl dynamodb create-table --cli-input-json file://db/messages.json --region us-east-1
echo \

echo "Showing created table"
aws --endpoint-url=$endpointUrl dynamodb list-tables
echo \

# S3 #
bucketName="chat-images"
echo "Creating S3 bucket called $bucketName"
aws --endpoint-url=$endpointUrl s3api create-bucket --bucket $bucketName
echo \

echo "Listing the created S3 bucket"
aws --endpoint-url=$endpointUrl s3api list-buckets
echo \

# Lambda #
echo "Creating zip for Lambda functions"
zip -r server/lambda.zip server/
echo \

echo "Creating getMessages Lambda"
aws --endpoint-url=$endpointUrl lambda create-function --function-name getMessages --zip-file fileb://server/lambda.zip --handler ./server/messages/getMessages.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
echo \

echo "Creating sendMessage Lambda"
aws --endpoint-url=$endpointUrl lambda create-function --function-name sendMessage --zip-file fileb://server/lambda.zip --handler ./server/messages/sendMessage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
echo \

echo "Creating SendImage Lambda"
aws --endpoint-url=$endpointUrl lambda create-function --function-name sendImage --zip-file fileb://server/lambda.zip --handler ./server/messages/sendImage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
echo \

echo "Creating resizeImage Lambda"
aws --endpoint-url=$endpointUrl lambda create-function --function-name resizeImage --zip-file fileb://server/lambda.zip --handler ./server/messages/resizeImage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
echo \

echo "Attaching trigger to resize-image Lambda"
aws --endpoint-url=$endpointUrl s3api put-bucket-notification-configuration --bucket $bucketName --notification-configuration file://server/messages/resize-image-trigger-config.json
echo \

# SNS & SQS #
echo "Creating SNS topic"
aws --endpoint-url=$endpointUrl sns create-topic --name imageResize --region us-east-1 --output table | cat
echo \

echo "Creaing SQS queue"
aws --endpoint-url=$endpointUrl sqs create-queue --queue-name imageResizeMessages --region us-east-1 --output table | cat
echo \

echo "Subscribe SQS queue to SNS topic"
aws --endpoint-url=$endpointUrl sns subscribe --topic-arn arn:aws:sns:us-east-1:000000000000:imageResize --protocol sqs --notification-endpoint arn:aws:sqs:us-east-1:000000000000:imageResizeMessages --output table | cat
echo \
