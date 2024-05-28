import React, { useState } from "react";
import "./ContactUs.css";
import { toast } from "react-toastify";
import { contactUs } from "./../../../core/services/contactUsServices";
import { errorMessage, successMessage } from "../../../core/utils/message";

const ContactUs = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const reset = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contact = {
      fullName,
      email,
      message,
    };

    try {
      const { status } = await contactUs(contact);
      if (status === 201) {
        successMessage("پیام با موفقیت ارسال شد");
        reset();
      }
    } catch (ex) {
      errorMessage("مشکلی پیش آمده");
      console.log(ex);
    }
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-center">
        <div className="phone">
          <div className="phone-text">09121121526</div>
        </div>
        <div className="email">
          <div className="email-text"> sepehr@gmail.com</div>
        </div>
      </div>

      <div
        className="d-flex justify-content-center "
        style={{ marginTop: "-20px" }}
      >
        <div className="location">
          <div className="location-text">مازندران.ساری</div>
        </div>
        <div className="support">
          <div className="support-text"> پشتیبانی 24 ساعته</div>
        </div>
      </div>
      <div className=" d-flex justify-content-center">
        <div className="message d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="message-box ">
              <input
                type="text"
                className="my-3"
                id="name"
                placeholder="نام و نام خانوداگی"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                className="my-1"
                id="email"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="متن پیام "
                className="my-2"
                id="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="message-button my-4" onClick={handleSubmit}>
                ارسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
