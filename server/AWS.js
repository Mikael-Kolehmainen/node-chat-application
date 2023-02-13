
module.exports.getAwsDocClient = function () {
    const AWS = require("aws-sdk");
    const awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://localhost:4566/",
        "accessKeyId": "key",
        "secretAccessKey": "secret-key"
    };
    AWS.config.update(awsConfig);

    return new AWS.DynamoDB.DocumentClient();
}