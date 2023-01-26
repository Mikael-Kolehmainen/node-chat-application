const AWS = require("aws-sdk");
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://localhost:8000/",
    "accessKeyId": "key",
    "secretAccessKey": "any-secret-access-key"
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const remove = () => {
    const params = {
        TableName: "messages",
        Key: {
            "message_id": 0
        }
    };
    docClient.delete(params, function(error, data) {
        if (error) {
            console.log("messages::delete:error - " + JSON.stringify(error, null, 2));
        } else {
            console.log("messages::delete:success");
        }
    });
}

remove();