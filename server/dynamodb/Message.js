const fs = require("fs");

const { AWS } = require("../AWS");
const DateTime = require("../misc/DateTime");
const key = require("../misc/key");

module.exports = class Message {
    #TABLE_NAME = "messages";
    #FIELD_KEY = "message_key";
    #FIELD_MESSAGE = "message";
    #FIELD_SENDER = "sender";
    #FIELD_DATE = "dateofmessage";
    #FIELD_TIME = "timeofmessage";

    #AWS_BUCKET = "chat-images";

    constructor(message) {
      this.message = message;
    }

    insert() {
      const docClient = new AWS.DynamoDB.DocumentClient();

      const today = new DateTime();
      const item = {
        "message_key": key.create(15),
        "message_date": today.getDateTime(),
        "message": this.message,
        "sender": "anonymous",
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

    insertImage() {
      /*
        TODO:
        1. Save image with unique name (randomize key) to S3
        2. Save name to Dynamodb
      */
      const fileName = key.create(15);
      const params = {
        Bucket: this.#AWS_BUCKET,
        Key: fileName,
        Body: this.message
      }

      const s3 = new AWS.S3({
        s3ForcePathStyle: true
      });
      s3.upload(params, function(err, data) {
        if (err) throw err;
        console.log("File uploaded", data);
      })
    }

    async selectAll() {
      const docClient = new AWS.DynamoDB.DocumentClient();

      const params = {
        TableName: this.#TABLE_NAME,
      };

      let scanResults = [];
      do{
        const items = await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      }while(typeof params.ExclusiveStartKey !== "undefined");

      scanResults.sort(this.#sortByDate);

      return scanResults;
    }

    #sortByDate(a, b) {
      if (a.message_date === b.message_date) {
        return 0;
      }
      else {
        return (a.message_date < b.message_date) ? -1 : 1;
      }
    }
}