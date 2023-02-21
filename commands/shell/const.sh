#!/bin/bash

export port="4566"
export endpointUrl="http://localhost:$port"
export SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

export bucketName="chat-images"

export lambdaFunctionResizeImage="lambda-resize-image"