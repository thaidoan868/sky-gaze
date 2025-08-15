import "./AboutUs.css";
import { useState } from "react";

export default function AboutUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  let errors = [emailError, phoneError];
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const nameChange = (e) => {
    const nameText = e.target.value;
    if (nameText.trim() === "") {
      setName("");
    } else if (nameText.length <= 50) {
      setName(nameText);
    }
  };

  const emailChange = (e) => {
    const emailText = e.target.value.trim();
    setEmail(emailText);

    if (!emailPattern.test(emailText)) {
      setEmailError("Invalid email format (must be like xxx@xxx.xxx)");
    } else {
      setEmailError("");
    }
  };

  const phoneChange = (e) => {
    // Remove all non-digit characters
    let value = e.target.value.replace(/\D/g, "");

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Format: xxxx-xxx-xxx
    let formatted = value;
    if (value.length > 4 && value.length <= 7) {
      formatted = `${value.slice(0, 4)}-${value.slice(4)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 4)}-${value.slice(4, 7)}-${value.slice(7)}`;
    }

    setPhone(formatted);

    if (value.length < 10) {
      setPhoneError("Phone number must be exactly 10 digits");
    } else {
      setPhoneError("");
    }
  };
  const messageChange = (e) => {
    const messageText = e.target.value;
    if (messageText.trim() === "") {
      setMessage("");
    } else {
      setMessage(messageText);
    }
  };
  const hasNoError = () => {
    return errors.every((err) => err === "");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (hasNoError()) {
      setSent(true);
    }
  };

  const cancelHandle = (e) => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="AboutUs text-white">
      <h2 className="" style={{ paddingTop: "100px" }}>
        Contact Us
      </h2>
      <div>
        <p>
          Email: <a href="mailto:aptech.fpt@fe.edu.vn">aptech.fpt@fe.edu.vn</a>
        </p>
        <p>21Bis Hau Giang, Tan Son Nhat, Ho Chi Minh City, Viet Nam.</p>
        <p>
          Hotline: <a href="tel:+84931313329"> +84 931 313 329</a>
        </p>
      </div>
      <div className="d-md-flex justify-content-center p-5 gap-5">
        <form
          onSubmit={onSubmit}
          className="flex-grow-1 text-start"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center">Get in touch</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Edison Harry"
                required
                value={name}
                onChange={nameChange}
                disabled={sent}
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Edison@gmail.com"
                aria-describedby="emailError"
                required
                value={email}
                onChange={emailChange}
                disabled={sent}
              />
              <div id="emailError" className="form-text text-danger">
                {emailError}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                Phone Number
              </label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                placeholder="+84 000-000-000"
                required
                value={phone}
                onChange={phoneChange}
                aria-describedby="phoneError"
                disabled={sent}
              />
              <div id="phoneError" className="form-text text-danger">
                {phoneError}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-bold">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                placeholder="Explore the universe"
                rows={3}
                required
                value={message}
                onChange={messageChange}
                disabled={sent}
              />
            </div>
          </div>
          {sent ? (
            <p className="text-success">
              Your request has been sent successfully. We'll reply to you soon.
              Thank you for using our products.{" "}
            </p>
          ) : (
            <div className="d-flex justify-content-between">
              <input type="submit" className="btn btn-primary" value={"Send"} />
              <input
                type="button"
                className="btn btn-danger"
                value="Cancel"
                onClick={cancelHandle}
              />
            </div>
          )}
        </form>
        <div className="text-start" style={{ maxWidth: "500px" }}>
          <h2 className="text-center text-md-start mt-5 mt-md-0 fw-bold">
            Company History
          </h2>
          <p className="mt-4">
            <strong>Sky Gazing</strong> is a pioneering company dedicated to
            bringing the wonders of the universe closer to everyone. We provide
            state-of-the-art telescopes, advanced astronomical equipment, and
            unique stargazing experiences, allowing our customers to explore the
            night sky with clarity and inspiration. Guided by a team of
            passionate experts, our mission is to connect people with the beauty
            of the cosmos and inspire curiosity that reaches beyond the horizon.
          </p>
        </div>
      </div>
    </div>
  );
}
