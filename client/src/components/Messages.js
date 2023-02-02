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
}

export default Messages;