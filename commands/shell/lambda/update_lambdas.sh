#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
source $SCRIPTPATH/../const.sh

echo "Creating zip for the Lambdas"
zip -r server/lambda.zip server/

echo "Deleting former Lambdas"
aws --endpoint-url=$endpointUrl lambda delete-function --function-name saveUser
aws --endpoint-url=$endpointUrl lambda delete-function --function-name getMessages
aws --endpoint-url=$endpointUrl lambda delete-function --function-name sendMessage
aws --endpoint-url=$endpointUrl lambda delete-function --function-name sendImage
aws --endpoint-url=$endpointUrl lambda delete-function --function-name resizeImage

echo "Creating new Lambdas"
aws --endpoint-url=$endpointUrl lambda create-function --function-name saveUser --zip-file fileb://server/lambda.zip --handler ./server/users/saveUser.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
aws --endpoint-url=$endpointUrl lambda create-function --function-name getMessages --zip-file fileb://server/lambda.zip --handler ./server/messages/getMessages.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
aws --endpoint-url=$endpointUrl lambda create-function --function-name sendMessage --zip-file fileb://server/lambda.zip --handler ./server/messages/sendMessage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
aws --endpoint-url=$endpointUrl lambda create-function --function-name sendImage --zip-file fileb://server/lambda.zip --handler ./server/messages/sendImage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
aws --endpoint-url=$endpointUrl lambda create-function --function-name resizeImage --zip-file fileb://server/lambda.zip --handler ./server/messages/resizeImage.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role

echo "Attaching triggers to Lambdas"
aws --endpoint-url=$endpointUrl s3api put-bucket-notification-configuration --bucket $bucketName --notification-configuration file://server/messages/resize-image-trigger-config.json