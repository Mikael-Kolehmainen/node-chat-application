const AWS = require("aws-sdk");
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://localhost:8000/",
    "accessKeyId": "key",
    "secretAccessKey": "any-secret-access-key"
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const modify = () => {
    const params = {
        TableName: "messages",
        Key: {"message_id": 2},
        UpdateExpression: "set message = :newMessage",
        ExpressionAttributeValues: {
            ":newMessage": "This is a modified message"
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function (error, data) {
        if (error) {
            console.log("messages::modify::error - " + JSON.stringify(error, null, 2));
        } else {
            console.log("messages::modify::success - " + JSON.stringify(data, null, 2));
        }
    });
}

modify();