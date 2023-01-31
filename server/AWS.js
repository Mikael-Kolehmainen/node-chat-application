
module.exports.getAwsDocClient = function () {
    const AWS = require("aws-sdk");
    const awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://localhost:8000/",
        "accessKeyId": "key",
        "secretAccessKey": "any-secret-access-key"
    };
    AWS.config.update(awsConfig);

    return new AWS.DynamoDB.DocumentClient();
}