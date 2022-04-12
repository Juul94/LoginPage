import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authentication } from "../components/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ title, setProfileData }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const { emailError, passwordError } = errors;

  function handleSetErrors(type, message) {
    setErrors((previousState) => ({
      ...previousState,
      [type]: message,
    }));
  }

  const handleAction = (e) => {
    e.preventDefault();

    const checkDomain = new RegExp(/^[A-Za-z0-9æøåÆØÅ._%+-]+@cphbusiness.dk$/);

    if (email === "") {
      handleSetErrors("emailError", "Enter email");
    } else if (!checkDomain.test(email)) {
      handleSetErrors("emailError", "Email must be a cphbusiness.dk email");
    }

    if (password === "") {
      handleSetErrors("passwordError", "Enter a password");
    } else if (password.length < 6) {
      handleSetErrors(
        "passwordError",
        "Hint: Password is at least 6 characters"
      );
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setProfileData(response.user);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          handleSetErrors("passwordError", "Wrong password");
        }
        if (error.code === "auth/user-not-found") {
          handleSetErrors("emailError", "Email doesn't exist");
        }
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      handleSetErrors("passwordError", "");
    }

    if (e.target.name === "email") {
      handleSetErrors("emailError", "");
      return setData((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value
          ? e.target.value + "@cphbusiness.dk"
          : "",
      }));
    }
    setData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form>
      <div className="container--small shadow p-3 mb-5 bg-white rounded">
        <div className="heading--area">
          <h1 className="h1--title">{title}</h1>
        </div>

        <div className="container--content">
          <div className="form-outline input-group mb-4 mr-sm-2">
            <input
              placeholder="Email"
              name="email"
              type="email"
              className={`form-control ${emailError && "errorStyle"}`}
              onChange={handleChange}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">@cphbusiness.dk</div>
            </div>
          </div>

          {emailError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {emailError}
            </div>
          )}

          <div className="form-outline mb-4">
            <input
              placeholder="Password"
              password="password"
              type="password"
              name="password"
              className={`form-control ${passwordError && "errorStyle"}`}
              onChange={handleChange}
            />
          </div>

          {passwordError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {passwordError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={handleAction}
          >
            Login
          </button>
          <div className="text-center">
            <p>
              Not a member? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
