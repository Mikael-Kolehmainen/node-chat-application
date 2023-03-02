import axios from "axios";

const BACKEND_ADDRESS = "http://localhost:3001";

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async signUp() {
    try {
      const user = {
        "username": this.username,
        "password": this.password,
      };
      const response = await axios.post(`${BACKEND_ADDRESS}/save-user`, user);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async signIn() {
    try {
      const user = {
        "username": this.username,
        "password": this.password,
      };
      const response = await axios.post(`${BACKEND_ADDRESS}/validate-user`, user);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;