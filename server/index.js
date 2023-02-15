const cookieParser = require("cookie-parser");
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const Message = require("./dynamodb/Message");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.post("/send-message", async (req, res) => {
  const messageData = typeof req.files !== "undefined" ? req.files.file.data : req.body.message;

  const message = new Message(messageData);

  if (typeof messageData === "string") {
    message.insert();
  } else if (typeof messageData === "object") {
    await message.insertImage();
  }
});

app.get("/get-messages", async (req, res) => {
  const message = new Message();
  res.send(await message.selectAll(req, res));
});

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});