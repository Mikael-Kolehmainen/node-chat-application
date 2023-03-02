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

  if (!user) {
    // return user not found to front-end
  }

  if (!await bcrypt.compare(user.Items[0].password, event.password)) {
    // return password was not correct to front-end
  }


}