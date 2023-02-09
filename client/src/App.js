import React, { useEffect, useState } from 'react';
import Messages from "./components/Messages";
import DateTime from "./classes/DateTime";

function App() {
  const [message, setMessage] = useState("");
  const [messageElements, setMessageElements] = useState([]);

  useEffect(() => {
    const messageUpdateInterval = setInterval(async () => {
      const messages = await getMessages();
      let elements = [];
      let messageDates = [];
      if (typeof messages !== "undefined") {
        messages.forEach(data => {
          const dateTime = new DateTime(data.message_date);
          const messageTime = dateTime.getHourMinute();
          const messageDate = dateTime.getDate();
          if (!messageDates.includes(messageDate)) {
            elements.push(
              <div className='date' key={messageDate}>
                <p className='p'>{messageDate}</p>
              </div>
            );
            messageDates.push(messageDate);
          }
          elements.push(
            <div className='message' key={data.message_key}>
              <p className='text'>{data.message}</p>
              <p className='time'>{messageTime}</p>
            </div>
          );
        });
      }
      setMessageElements(elements);
    }, 100);

    return () => clearInterval(messageUpdateInterval);
  }, [])

  async function getMessages() {
    return await Messages.get();
  }

  const handleChange = (event) => {
    setMessage({[event.target.name]: event.target.value});
  }

  async function sendMessage(event) {
    event.preventDefault();
    Messages.send(message);
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
          <input type='text' name='message' onChange={handleChange} id='message-input' className='input-field' placeholder='Write message here' required />
          <input type='submit' name='send-message' value='SEND' className='btn' />
        </form>
      </article>
    </section>
  );
}

export default App;
