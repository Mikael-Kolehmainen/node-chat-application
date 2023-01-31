const AWS = require("../AWS");
const dateTime = require("../misc/datetime");
const key = require("../misc/key");

module.exports.insertMessage = function (message) {
    const docClient = AWS.getAwsDocClient();

    const date = dateTime.getCurrentDate();
    const time = dateTime.getCurrentTime();

    const item = {
        "message_key": key.create(15),
        "message": message,
        "sender": "anonymous",
        "dateofmessage": date,
        "timeofmessage": time
    };
    const params = {
        TableName: "messages",
        Item: item
    }
    docClient.put(params, function(error, data) {
        if (error) {
            console.log("messages::save::error - " + JSON.stringify(error, null, 2));
        } else {
            console.log("messages::save::success");
        }
    });
}