const express = require("express");
const cors = require("cors");
const Message = require("./dynamodb/Message");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-message", (req, res) => {
    const message = new Message(req.body.message);
    message.insert();
});

app.get("/get-messages", async (req, res) => {
    const message = new Message();
    const messages = await message.selectAll();
    res.send(messages);
});

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});