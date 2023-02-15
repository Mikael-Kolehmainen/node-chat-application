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
      if (error) console.log("messages::insert::error - " + JSON.stringify(error, null, 2));
      console.log("messages::insert::success");
    });
  }

  insertImage() {
    const s3 = new AWS.S3({
      s3ForcePathStyle: true
    });
    const fileName = key.create(15);
    const params_s3 = {
      Bucket: this.#AWS_BUCKET,
      Key: fileName,
      Body: this.message
    };

    s3.upload(params_s3, function(err, data) {
      if (err) throw err;
      console.log("File uploaded", data);
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    const today = new DateTime();
    const item = {
      "message_key": key.create(15),
      "message_date": today.getDateTime(),
      "message_image_name": fileName,
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

  async selectAll(req, res) {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: this.#TABLE_NAME,
    };

    let messages = [];
    do{
      const items = await docClient.scan(params).promise();
      items.Items.forEach((item) => messages.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof params.ExclusiveStartKey !== "undefined");

    messages.sort(this.#sortByDate);

    // Couldn't get the cookie to work
/*    console.log(JSON.stringify(req.cookies));

    if (typeof req.cookies !== "undefined" && typeof req.cookies.token !== "undefined") {
      const cookieToken = req.cookies.token;
      const amountOfMessages = jwt.verify(cookieToken, this.#JWT_SECRET_KEY);

      if (amountOfMessages == messages.length) {
        return "already saved";
      }
    }

    const token = jwt.sign(messages.length, this.#JWT_SECRET_KEY)

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
    }); */

    const s3 = new AWS.S3({
      s3ForcePathStyle: true
    });
    messages.forEach(async (message) => {
      if (typeof message.message_image_name !== "undefined") {
        const params_s3 = {
          Bucket: this.#AWS_BUCKET,
          Key: message.message_image_name
        };
        try {
          message.message_image_url = await s3.getSignedUrlPromise('getObject', params_s3);
        } catch (error) {
          console.warn(`Error: ${error}`);
        }
      }
    });

    return messages;
  }

  #sortByDate(a, b) {
    if (a.message_date === b.message_date) {
      return 0;
    } else {
      return (a.message_date < b.message_date) ? -1 : 1;
    }
  }
}