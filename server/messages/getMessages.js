const { AWS } = require("../AWS");

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "messages",
  };

  let messages = [];
  do{
    const items = await docClient.scan(params).promise();
    items.Items.forEach((item) => messages.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  }while(typeof params.ExclusiveStartKey !== "undefined");

  messages.sort(sortByDate);

  return messages;
}

const sortByDate = (a, b) => {
  if (a.message_date === b.message_date) {
    return 0;
  } else {
    return (a.message_date < b.message_date) ? -1 : 1;
  }
}