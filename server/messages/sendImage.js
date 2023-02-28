const { AWS } = require("../AWS");
const key = require("../misc/key");
const DateTime = require("../misc/DateTime");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const today = new DateTime();
  const item = {
    "message_key": key.create(15),
    "message_date": today.getDateTime(),
    "message_image_path": event.imagePath,
    "sender": "anonymous",
  };
  const params_db = {
    TableName: "messages",
    Item: item,
  };
  docClient.put(params_db, function(error, data) {
    if (error) console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
    console.log("messages::insert::success");
  });
}