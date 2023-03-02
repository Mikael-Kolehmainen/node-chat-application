import { useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "./User";


function SignIn() {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const navigate = useNavigate();

  const saveUsername = (event) => {
    setUsernameField(event.target.value);
  }

  const savePassword = (event) => {
    setPasswordField(event.target.value);
  }

  const signIn = async (event) => {
    event.preventDefault();
    const user = new User(usernameField, passwordField);
    const redirectAddress = await user.signIn();
    navigate(redirectAddress);
  }

  return (
    <section>
      <article className="box sign-in">
        <h1>SIGN IN</h1>
        <form onSubmit={signIn}>
          <input type="text" onChange={saveUsername} name="username" placeholder="USERNAME" maxLength={25} className="input-field" />
          <input type="password" onChange={savePassword} name="pw" placeholder="PASSWORD" maxLength={25} className="input-field" />
          <input type="submit" name="sign-in" value="SIGN IN" className="btn" />
        </form>
        <a href="/">New?</a>
      </article>
    </section>
  );
}

export default SignIn;