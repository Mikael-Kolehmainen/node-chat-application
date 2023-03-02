const bcrypt = require("bcrypt");
const { AWS } = require("../AWS");
const key = require("../misc/key");

exports.handler = async(event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const today = new DateTime();
  const item = {
    "user_key": key.create(15),
    "user_date": today.getDateTime(),
    "username": event.username,
    "password": ,
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