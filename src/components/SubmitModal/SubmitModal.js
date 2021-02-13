import React, { useState, useEffect, useContext } from "react";
import html2canvas from "html2canvas";
import "./_SubmitModal.scss";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import PanelContext from "../../contexts/PanelContext";

const loadingStyles = css`
  margin: 0 auto;
`;

const Modal = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { panelSize } = useContext(PanelContext);

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
    try {
      setLoading(true);
      const { firstName, lastName, email, phone, comments } = formData;
      const { width, length } = panelSize;
      html2canvas(document.querySelector("#panel")).then((canvas) => {
        const data = {
          email: email,
          title: `Panel Quote Request From: ${firstName} ${lastName}`,
          message: `Quote Request - <br>
            Name: ${firstName} ${lastName}<br>
            Email: ${email}<br>
            Phone: ${phone}<br>
            Additional Comments: ${comments}<br>
            Width: ${width}<br>
            Length: ${length}
          `,
          image: canvas.toDataURL("image/png"),
        };

        fetch("https://panel-builder-api.herokuapp.com:8888/api/v1/contact", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              setFormSuccess(true);
              setLoading(false);
              res.json();
            } else {
              throw new Error(res);
            }
          })
          .catch((error) => {
            alert(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formContents">
        {!formSuccess ? (
          <form className="modalForm" onSubmit={submitPanel}>
            <div className="closeBtn" onClick={() => props.setShow(false)}>
              x
            </div>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder="First Name*"
              className="submitFormInput"
              required
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name*"
              className="submitFormInput"
              required
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email*"
              className="submitFormInput"
              required
            />
            <input
              type="phone"
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              className="submitFormInput"
            />
            <textarea
              name="comments"
              onChange={handleChange}
              placeholder="Additional Comments or Requests"
              className="submitFormTextArea"
            />
            <button type="submit" className="submitButton">
              Get Quote
            </button>
            <p style={{ color: "white" }}>* Required Field</p>
          </form>
        ) : (
          <div className="successMessage">
            <h2>Success!</h2>
            <p>
              Your free quote request has been sent to Miller Marine. A
              representative will reach out to you with a hardened quote within
              the next 2-5 days.
            </p>
            <FontAwesomeIcon icon={faArrowCircleLeft} />
            <a
              className="backToMiller"
              href="http://www.millermarinefl.com/home.html"
            >
              Back to millermarinefl.com
            </a>
          </div>
        )}
        <FadeLoader css={loadingStyles} loading={loading} />
      </div>
    </div>
  );
};

export default Modal;
