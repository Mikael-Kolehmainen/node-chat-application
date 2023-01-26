import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
/*    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div> */
    <section>
      <article className='box chat'>
        <header>
          <h1>CHAT</h1>
        </header>
        <div className='chat-view'>
          <div className='messages'>

          </div>
        </div>
        <form className='chat-controller'>
          <input type='text' name='message' className='input-field' placeholder='Write message here' required />
          <input type='submit' name='send-message' value='SEND' className='btn' />
        </form>
      </article>
    </section>
  );
}

export default App;
