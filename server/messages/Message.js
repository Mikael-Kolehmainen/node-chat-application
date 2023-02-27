const jwt = require("jsonwebtoken");

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
  #JWT_SECRET_KEY = "tdM1gNg8JpWdKcE";

  constructor(message) {
    this.message = message;
  }

  async insertImage() {
    const s3 = new AWS.S3({
      s3ForcePathStyle: true
    });
    const fileName = key.create(15);
    const params_s3 = {
      Bucket: this.#AWS_BUCKET,
      Key: fileName,
      Body: this.message
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
      Item: item
    };
    docClient.put(params_db, function(error, data) {
      if (error) console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
      console.log("messages::insert::success");
    });
  }
}