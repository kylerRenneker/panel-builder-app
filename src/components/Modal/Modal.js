import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./_modal.scss";

const Modal = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    console.log(formData);
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitPanel = (e) => {
    e.preventDefault();

    html2canvas(document.querySelector("#panel")).then((canvas) => {
      const data = {
        email: "Krenneker16@gmail.com",
        title: "panelTest",
        message: "This is a test for the panel builder app",
        image: canvas.toDataURL("image/png"),
      };

      fetch("http://localhost:8888/api/v1/contact", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    });
  };

  return (
    <div className="formContainer">
      <form className="modalForm">
        <div className="closeBtn" onClick={() => props.setShow(false)}>
          x
        </div>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          className="submitFormInput"
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
          className="submitFormInput"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="submitFormInput"
        />
        <input
          type="phone"
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          className="submitFormInput"
        />
        <textarea
          onChange={handleChange}
          placeholder="Additional Comments or Requests"
          className="submitFormTextArea"
        />
        <button onSubmit={submitPanel} className="submitButton">
          Get Quote
        </button>
      </form>
    </div>
  );
};

export default Modal;
