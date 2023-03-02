import React, { useEffect, useState } from 'react';
import Messages from "./Messages";
import DateTime from "./../classes/DateTime";

import imagePreviewPlaceholder from './../media/placeholder.jpg';

export default function Chat() {
  let [message, setMessage] = useState("");
  let [image, setImage] = useState(null);
  const [messageElements, setMessageElements] = useState([]);
  const [imagePreview, setimagePreview] = useState(imagePreviewPlaceholder);
  const [hideFileUpload, setHideFileUpload] = useState(false);
  const [hideImagePreview, setHideImagePreview] = useState(true);
  const [expandMessageInput, setExpandMessageInput] = useState(false);

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
    setHideFileUpload(true);
    setHideImagePreview(false);
    setExpandMessageInput(true)
    const imagePreviewURL = URL.createObjectURL(event.target.files[0]);
    setimagePreview(imagePreviewURL);
    setImage(event.target.files[0]);
    event.target.value = '';
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    setHideFileUpload(false);
    setHideImagePreview(true);
    setExpandMessageInput(false)
    if (message !== "") {
      await Messages.send(message);
      setMessage("");
    } else if (image !== null) {
      await Messages.sendImage(image);
      setImage(null);
    }
  }

  const removeImage = () => {
    setHideFileUpload(false);
    setHideImagePreview(true);
    setExpandMessageInput(false)
    setImage(null);
  }

  return (
    <section>
    <article className='box chat'>
      <header>
        <h1>CHAT</h1>
      </header>
      <div className={`chat-view ${expandMessageInput ? "shrinked" : ""}`}>
        <div className='messages'>
          {messageElements}
        </div>
      </div>
      <form className={`chat-controller ${expandMessageInput ? "expanded" : ""}`} onSubmit={sendMessage}>
        <input type='text' name='message' disabled={hideFileUpload} onChange={handleTextInput} id='message-input' className={`input-field ${expandMessageInput ? "expanded" : ""}`} placeholder='Write message here' />
        <div className={`btn icon red round remove-image ${hideImagePreview ? "hide" : ""}`} onClick={removeImage}>
          <i className='fa-solid fa-xmark'></i>
        </div>
        <img id='image-preview' className={`${hideImagePreview ? "hide" : ""}`} src={imagePreview} alt='' />
        <div className={`file-upload ${hideFileUpload ? "hide" : ""}`}>
          <label htmlFor='message-media-input' className='btn icon'>
            <i className='fa-solid fa-file'></i>
          </label>
          <input type='file' name='message-media' onChange={handleImageInput} id='message-media-input' className="input-media-field" accept='image/jpg/jpeg/png/gif' />
        </div>
        <input type='submit' name='send-message' value='SEND' className='btn' id='send-btn' />
      </form>
    </article>
  </section>
  );
}