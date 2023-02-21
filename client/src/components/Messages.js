import axios from "axios";

const BACKEND_ADDRESS = "http://localhost:3001";

class Messages {

  static async get() {
    try {                                                                 /* Has to do with cookies & jwt */
        const response = await axios.get(`${BACKEND_ADDRESS}/get-messages`/*, {withCredentials: true}*/);
        return response.data;
    } catch (error) {
        console.log(error);
    }
  }

  static async send(message) {
    try {
      document.getElementById("message-input").value = "";
      const response = await axios.post(`${BACKEND_ADDRESS}/send-message`, message);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async sendImage(image) {
    try {
      document.getElementById("message-media-input").value = "";
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(`${BACKEND_ADDRESS}/send-message`, formData);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Messages;