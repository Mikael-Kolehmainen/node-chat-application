import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setMessage({[event.target.name]: event.target.value});
  }

  async function sendMessage (event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/send-message", message);

      console.log(response);
    } catch (error) {
      console.log(error);
    }

  /*  fetch('http://localhost:3001/send-message', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(message)
    }).then(function(response) {
      console.log(response);
      return response.json;
    }); */
  }

  return (
    <section>
      <article className='box chat'>
        <header>
          <h1>CHAT</h1>
        </header>
        <div className='chat-view'>
          <div className='messages'>
            <p></p>
          </div>
        </div>
        <form className='chat-controller' onSubmit={sendMessage}>
          <input type='text' name='message' onChange={handleChange} className='input-field' placeholder='Write message here' required />
          <input type='submit' name='send-message' value='SEND' className='btn' />
        </form>
      </article>
    </section>
  );
}

export default App;
