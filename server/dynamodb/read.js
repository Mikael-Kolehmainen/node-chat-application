let AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://localhost:8000/",
    "accessKeyId": "key",
    "secretAccessKey": "any-secret-access-key"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const fetchOneByKey = () => {
    const params = {
        TableName: "messages",
        Key: {
            "message_id": 0
        }
    };

    docClient.get(params, function (error, data) {
        if (error) {
            console.log("messages::fetchOneByKey::error - " + JSON.stringify(error, null, 2));
        } else {
            console.log("messages::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    });
}

fetchOneByKey();