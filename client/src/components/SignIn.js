import { useState } from "react";

import User from "./User";


function SignIn() {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const saveUsername = (event) => {
    setUsernameField(event.target.value);
  }

  const savePassword = (event) => {
    setPasswordField(event.target.value);
  }

  const signIn = async (event) => {
    const user = new User(usernameField, passwordField);
    await user.signIn();
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