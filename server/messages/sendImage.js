const { AWS } = require("../AWS");
const key = require("../misc/key");
const DateTime = require("../misc/DateTime");

exports.handler = async (event, context) => {
  const s3 = new AWS.S3({
    s3ForcePathStyle: true
  });
  const fileName = key.create(15);
  const params_s3 = {
    Bucket: "chat-images",
    Key: fileName,
    Body: event.messageData,
  };

  let filePath = "";

  try {
    const imageData = await s3.upload(params_s3).promise();
    filePath = imageData.Location;
  } catch (error) {
    throw error;
  }

  const docClient = new AWS.DynamoDB.DocumentClient();

  const today = new DateTime();
  const item = {
    "message_key": key.create(15),
    "message_date": today.getDateTime(),
    "message_image_path": filePath,
    "sender": "anonymous",
  };
  const params_db = {
    TableName: this.#TABLE_NAME,
    Item: item,
  };
  docClient.put(params_db, function(error, data) {
    if (error) console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
    console.log("messages::insert::success");
  });
}