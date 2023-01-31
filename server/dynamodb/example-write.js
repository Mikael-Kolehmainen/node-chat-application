const AWS = require("aws-sdk");
const awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://localhost:8000/",
    "accessKeyId": "key",
    "secretAccessKey": "any-secret-access-key"
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const save = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();

    const input = {
        "message_id": 2, "message": "This is a message from client side.",
        "sender": "user", "dateofmessage": date, "timeofmessage": time
    };
    const params = {
        TableName: "messages",
        Item: input
    };
    docClient.put(params, function(error, data) {
        if (error) {
            console.log("messages::save::error - " + JSON.stringify(error, null, 2));
        } else {
            console.log("messages::save::success");
        }
    });
}

save();