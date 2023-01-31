const AWS = require("../AWS");
const DateTime = require("../misc/DateTime");
const key = require("../misc/key");

module.exports = class Message {
    constructor(message) {
        this.message = message;
    }

    insert() {
        const docClient = AWS.getAwsDocClient();

        const today = new DateTime();
        const date = today.getCurrentDate();
        const time = today.getCurrentTime();

        const item = {
            "message_key": key.create(15),
            "message": this.message,
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
}