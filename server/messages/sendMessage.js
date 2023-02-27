const { AWS } = require("../AWS");
const DateTime = require("../misc/DateTime");
const key = require("../misc/key");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const today = new DateTime();
  const item = {
    "message_key": key.create(15),
    "message_date": today.getDateTime(),
    "message": event.messageData,
    "sender": "anonymous",
  };
  const params = {
    TableName: "messages",
    Item: item
  }
  docClient.put(params, function(error, data) {
    if (error) console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
    console.log("messages::insert::success");
  });
}