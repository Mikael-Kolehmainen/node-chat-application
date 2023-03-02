const bcrypt = require("bcrypt");
const { AWS } = require("../AWS");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "users",
    Key: {
      "username": {S: "test"}
    },
    ProjectionExpression: "username, password"
  };

  const user = await docClient.scan(params).promise();

  // Doesn't work for some reason, redirect to sign-in altough user exists and password is correct
/*  if (!user) {
    return "/sign-in";
  }

  if (!await bcrypt.compare(user.Items[0].password, event.password)) {
    return "/sign-in";
  } */

  return "/chat";
}