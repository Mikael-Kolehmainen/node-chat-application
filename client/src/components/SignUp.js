import { useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "./User";

function SignUp() {
  const [passwordField, setPasswordField] = useState("");
  const [repeatPasswordField, setRepeatPasswordField] = useState("");
  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [passwordLengthValidationColor, setPasswordLengthValidationColor] = useState({color: "white"});
  const [usernameField, setUsernameField] = useState("");
  const navigate = useNavigate();

  const savePassword = (event) => {
    setPasswordField(event.target.value);
  }

  const saveRepeatPassword = (event) => {
    setRepeatPasswordField(event.target.value);
  }

  const validatePassword = (event) => {
    if (passwordField === repeatPasswordField) {
      setDisableSubmitBtn(false);
      setPasswordValidationMsg("");
    } else {
      setDisableSubmitBtn(true);
      setPasswordValidationMsg("Passwords don't match");
    }

    if (passwordField.length < 8) {
      setDisableSubmitBtn(true);
      setPasswordLengthValidationColor({color: "red"});
    } else {
      setPasswordLengthValidationColor({color: "white"});
    }
  }

  const saveUsername = (event) => {
    setUsernameField(event.target.value);
  }

  const signUp = async (event) => {
    event.preventDefault();
    const user = new User(usernameField, passwordField);
    const redirectAddress = await user.signUp();
    navigate(redirectAddress);
  }

  return(
    <section>
      <article className="box sign-up">
        <h1>SIGN UP</h1>
        <form onSubmit={signUp}>
          <input type="text" name="username" onChange={saveUsername} placeholder="USERNAME" className="input-field" maxLength={25} />
          <input type="password" onChange={savePassword} onBlur={validatePassword} name="pw" maxLength={25} placeholder="PASSWORD" className="input-field" />
          <input type="password" onChange={saveRepeatPassword} onBlur={validatePassword} name="repeat-pw" maxLength={25} placeholder="REPEAT PASSWORD" className="input-field" />
          <p id="validation-msg">{passwordValidationMsg}</p>
          <div className="small-notice">
              <p>Password must be at least:</p>
              <ul>
                  <li style={passwordLengthValidationColor}>8 characters long</li>
              </ul>
          </div>
          <input type="submit" name="sign-up" value="SIGN UP" className="btn" disabled={disableSubmitBtn} />
        </form>
        <a href="/sign-in">Already have an account?</a>
      </article>
    </section>
  );
}

export default SignUp;