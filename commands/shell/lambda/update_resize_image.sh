#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
source $SCRIPTPATH/../const.sh

echo "Creating zip of resize-image Lambda"
zip -r ./server/lambda/resize-image.zip ./server/
echo \

echo "Deleting old resize-image Lambda"
aws --endpoint-url=$endpointUrl lambda delete-function --function-name $lambdaFunctionResizeImage
echo \

echo "Creating resize-image Lambda"
aws --endpoint-url=$endpointUrl lambda create-function --function-name $lambdaFunctionResizeImage --zip-file fileb://server/lambda/resize-image.zip --handler ./server/lambda/resize-image.handler --runtime nodejs16.x --role arn:aws:iam::000000000000:role/lambda-role
echo \

echo "Attaching trigger to resize-image Lambda"
aws --endpoint-url=$endpointUrl s3api put-bucket-notification-configuration --bucket $bucketName --notification-configuration file://server/lambda/resize-image-trigger-config.json
echo \
