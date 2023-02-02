import React, { useEffect, useState } from 'react';
import axios from "axios";
import Messages from "./components/Messages";

function App() {
  const [message, setMessage] = useState(null);
  const [messageElements, setMessageElements] = useState([]);

  useEffect(() => {
    const messageUpdateInterval = setInterval(async () => {
      const messages = await updateMessages();
      let elements = [];
      messages.forEach(data => {
        const shortenedMessageTime = data.timeofmessage.substring(0, 5);
        elements.push(
          <div className='message' key={data.message_key}>
            <p className='text'>{data.message}</p>
            <p className='time'>{shortenedMessageTime}</p>
          </div>
        );
      });
      setMessageElements(elements);
    }, 100);

    return () => clearInterval(messageUpdateInterval);
  }, [])

  async function updateMessages() {
    return await Messages.get();
  }

  const handleChange = (event) => {
    setMessage({[event.target.name]: event.target.value});
  }

  async function sendMessage(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/send-message", message);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <article className='box chat'>
        <header>
          <h1>CHAT</h1>
        </header>
        <div className='chat-view'>
          <div className='messages'>
            {messageElements}
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
