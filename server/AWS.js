const AWS = require("aws-sdk");
const awsConfig = {
  "endpoint": "http://localhost:4566/",
  "region": "us-east-1",
  "accessKeyId": "key",
  "secretAccessKey": "secret-key"
};
AWS.config.update(awsConfig);

exports.AWS = AWS;