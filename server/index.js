const express = require("express");
const cors = require("cors");
const message = require("./dynamodb/message");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-message", (req, res) => {
    message.insertMessage(req.body.message);
});

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});