

function SignIn() {
  return (
    <section>
      <article className="box sign-in">
        <h1>SIGN IN</h1>
        <form>
          <input type="text" name="username" placeholder="USERNAME" maxLength={25} className="input-field" />
          <input type="password" name="pw" placeholder="PASSWORD" maxLength={25} className="input-field" />
          <input type="submit" name="sign-in" value="SIGN IN" className="btn" />
        </form>
        <a href="/">New?</a>
      </article>
    </section>
  );
}

export default SignIn;