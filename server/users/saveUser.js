const bcrypt = require("bcrypt");
const { AWS } = require("../AWS");
const DateTime = require("../misc/DateTime");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const today = new DateTime();
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(event.password, 10);
  } catch (error) {
    console.error(error.message);
  }

  const item = {
    "user_date": today.getDateTime(),
    "username": event.username,
    "password": hashedPassword,
  };
  const params = {
    TableName: "users",
    Item: item
  }
  docClient.put(params, function(error, data) {
    if (error) console.log("users::insert::error - " + JSON.stringify(error, null, 2));
    console.log("users::insert::success");
  });
}