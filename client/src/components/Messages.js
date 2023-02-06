import axios from "axios";

class Messages {
    static async get() {
        try {
            const response = await axios.get("http://localhost:3001/get-messages");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async send(message) {
        try {
          document.getElementById('message-input').value = "";
          const response = await axios.post("http://localhost:3001/send-message", message);

          console.log(response);
        } catch (error) {
          console.log(error);
        }
    }
}

export default Messages;