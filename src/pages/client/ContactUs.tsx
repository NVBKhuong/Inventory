import React from 'react';
import './CSS/ContactUsCSS.css';
const ContactUs: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="right-col">
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" />
            <div className="slider round"></div>
          </label>
        </div>

        <h1>Contact us</h1>
        <p>Need assistance? Text us!</p>

        <form id="contact-form" method="post">
          <label htmlFor="name">Full name</label>
          <input type="text" id="name" name="name" placeholder="Your Full Name" required />
          
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Your Email Address" required />
          
          <label htmlFor="message">Message</label>
          <textarea rows={6} placeholder="Your Message" id="message" name="message" required></textarea>
          
          <button type="submit" id="submit" name="submit">Send</button>
        </form>
        <div id="error"></div>
        <div id="success-msg"></div>
      </div>
    </div>
  );
}

export default ContactUs;
