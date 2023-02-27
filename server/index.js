const cookieParser = require("cookie-parser");
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const { AWS } = require("./AWS");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.post("/send-message", async (req, res) => {
  const messageData = typeof req.files !== "undefined" ? req.files.file.data : req.body.message;
  let params;

  if (typeof messageData === "string") {
    params = {
      FunctionName: "sendMessage",
      Payload: `{"messageData" : "${messageData}"}`,
    };
  } else if (typeof messageData === "object") {
    params = {
      FunctionName: "sendImage",
      Payload: `{"messageData" : "${messageData}"}`,
    };
  }
  const lambda = new AWS.Lambda();
  try {
    await lambda.invoke(params).promise();
  } catch (error) {
    console.log(error, error.stack);
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
    console.log(error, error.stack);
  }
});

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});