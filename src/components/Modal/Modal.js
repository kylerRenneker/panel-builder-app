import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import "./_modal.scss";

const Modal = () => {
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
    <form className="modalForm">
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="phone"
        name="phone"
        onChange={handleChange}
        placeholder="Phone"
      />
      <textarea
        onChange={handleChange}
        placeholder="Additional Comments or Requests"
      />
      <button onSubmit={submitPanel}>GET FREE QUOTE</button>
    </form>
  );
};

export default Modal;
