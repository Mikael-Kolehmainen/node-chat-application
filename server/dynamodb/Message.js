const AWS = require("../AWS");
const DateTime = require("../misc/DateTime");
const key = require("../misc/key");

module.exports = class Message {
    #TABLE_NAME = "messages";
    #FIELD_KEY = "message_key";
    #FIELD_MESSAGE = "message";
    #FIELD_SENDER = "sender";
    #FIELD_DATE = "dateofmessage";
    #FIELD_TIME = "timeofmessage";

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
            TableName: this.#TABLE_NAME,
            Item: item
        }
        docClient.put(params, function(error, data) {
            if (error) {
                console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
            } else {
                console.log("messages::insert::success");
            }
        });
    }

    async selectAll() {
        const docClient = AWS.getAwsDocClient();

        const params = {
            TableName: this.#TABLE_NAME,
        };

        const scanResults = [];
        do{
            const items = await docClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        }while(typeof params.ExclusiveStartKey !== "undefined");

        return scanResults;
    }
}