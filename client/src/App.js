import React, { useEffect, useState } from 'react';
import Messages from "./components/Messages";
import DateTime from "./classes/DateTime";

function App() {
  let [message, setMessage] = useState("");
  let [image, setImage] = useState(null);
  const [messageElements, setMessageElements] = useState([]);

  useEffect(() => {
    const messageUpdateInterval = setInterval(async () => {
      const messages = await getMessages();
      console.log(messages);
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
          if (typeof data.message !== "undefined") {
            elements.push(
              <div className='message' key={data.message_key}>
                <p className='text'>{data.message}</p>
                <p className='time'>{messageTime}</p>
              </div>
            );
          } else if (typeof data.message_image_path !== "undefined") {
            elements.push(
              <div className='message' key={data.message_key}>
                <img src={data.message_image_path} alt=''/>
                <p className='time'>{messageTime}</p>
              </div>
            );
          }
        });
      }
      setMessageElements(elements);
    }, 1000);

    return () => clearInterval(messageUpdateInterval);
  }, [])

  const getMessages = async () => {
    return await Messages.get();
  }

  const handleTextInput = (event) => {
    setMessage({[event.target.name]: event.target.value});
  }

  const handleImageInput = (event) => {
    setImage(event.target.files[0]);
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message !== "") {
      Messages.send(message);
      setMessage("");
    } else if (image !== null) {
      Messages.sendImage(image);
      setImage(null);
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
          <input type='text' name='message' onChange={handleTextInput} id='message-input' className='input-field' placeholder='Write message here' />
          <div className='file-upload'>
            <label htmlFor='message-media-input' className='btn icon'>
              <i className='fa-solid fa-file'></i>
            </label>
            <input type='file' name='message-media' onChange={handleImageInput} id='message-media-input' className='input-media-field' accept='image/jpg/jpeg/png/gif' />
          </div>
          <input type='submit' name='send-message' value='SEND' className='btn' id='send-btn' />
        </form>
      </article>
    </section>
  );
}

export default App;
