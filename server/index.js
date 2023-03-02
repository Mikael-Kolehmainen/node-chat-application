const cookieParser = require("cookie-parser");
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const { AWS } = require("./AWS");
const key = require("./misc/key");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.post("/save-user", async (req, res) => {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: "saveUser",
    Payload: JSON.stringify(req.body),
  };
  try {
    await lambda.invoke(params).promise();
    res.send("/chat");
  } catch (error) {
    console.error(error, error.stack);
    res.send("/sign-up");
  }
});

app.post("/validate-user", async (req, res) => {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: "validateUser",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(req.body),
  };
  try {
    const redirectAddress = await lambda.invoke(params).promise();
    console.log(redirectAddress);
    res.send(redirectAddress.Payload);
  } catch (error) {
    console.error(error, error.stack);
    res.send("/sign-in");
  }
});

app.post("/send-message", async (req, res) => {
  const messageData = typeof req.files !== "undefined" ? req.files.file.data : req.body.message;
  let params;

  if (typeof messageData === "string") {
    params = {
      FunctionName: "sendMessage",
      Payload: `{"messageData" : "${messageData}"}`,
    };
  } else if (typeof messageData === "object") {
    const s3 = new AWS.S3({
      s3ForcePathStyle: true
    });
    const fileName = key.create(15);
    const params_s3 = {
      Bucket: "chat-images",
      Key: fileName,
      Body: messageData,
    };

    let filePath = "";

    try {
      const imageData = await s3.upload(params_s3).promise();
      filePath = imageData.Location;
    } catch (error) {
      throw error;
    }
    params = {
      FunctionName: "sendImage",
      Payload: `{"imagePath" : "${filePath}"}`,
    };
  }
  const lambda = new AWS.Lambda();
  try {
    await lambda.invoke(params).promise();
  } catch (error) {
    console.error(error, error.stack);
  }
});

app.get("/get-messages", async (req, res) => {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: "getMessages",
  };

  try {
    const messages = await lambda.invoke(params).promise();
    res.send(messages.Payload);
  } catch (error) {
    console.error(error, error.stack);
  }
});

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});