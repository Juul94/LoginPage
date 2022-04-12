import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { authentication } from "../components/Firebase-config";

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Signup({ title, setProfileData }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    fullNameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmError: "",
  });
  const { fullNameError, emailError, passwordError, passwordConfirmError } =
    errors;

  function handleSetErrors(type, message) {
    setErrors((previousState) => ({
      ...previousState,
      [type]: message,
    }));
  }

  const handleAction = (e) => {
    e.preventDefault();

    const checkDigit = /\d/;
    const checkSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const checkDomain = new RegExp(/^[A-Za-z0-9æøåÆØÅ._%+-]+@cphbusiness.dk$/);
    const checkLetters = /^[a-zA-ZæøåÆØÅ\s]*$/g;

    if (fullName === "") {
      return handleSetErrors("fullNameError", "Enter full name");
    } else if (!checkLetters.test(fullName)) {
      return handleSetErrors(
        "fullNameError",
        "Full name must only be letters (Spaces allowed)"
      );
    }

    if (email === "") {
      return handleSetErrors("emailError", "Enter email");
    } else if (!checkDomain.test(email)) {
      return handleSetErrors(
        "emailError",
        "Email must be a cphbusiness.dk email"
      );
    }

    if (password === "") {
      return handleSetErrors("passwordError", "Enter a password");
    } else if (password.length < 6) {
      return handleSetErrors(
        "passwordError",
        "Password must be min 6 characters"
      );
    } else if (!checkDigit.test(password)) {
      return handleSetErrors(
        "passwordError",
        "Password must contain at least one digit"
      );
    } else if (!checkSpecialChar.test(password)) {
      return handleSetErrors(
        "passwordError",
        "Password must contain at least one special character"
      );
    }
    if (passwordConfirm === "") {
      return handleSetErrors("passwordConfirmError", "Repeat the password");
    } else if (password != passwordConfirm) {
      return (
        handleSetErrors("passwordError", "Passwords must match") +
        handleSetErrors("passwordConfirmError", "Passwords must match")
      );
    }

    createUserWithEmailAndPassword(
      authentication,
      email,
      password,
      passwordConfirm
    )
      .then((response) => {
        const auth = getAuth();

        updateProfile(auth.currentUser, {
          displayName: fullName,
        })
          .then(() => {
            setProfileData(response.user);
            sessionStorage.setItem(
              "Auth Token",
              response._tokenResponse.refreshToken
            );
            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          return handleSetErrors("emailError", "Email already in use");
        }
      });
  };

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { fullName, email, password, passwordConfirm } = data;

  const handleChange = (e) => {
    if (e.target.name === "fullName") {
      handleSetErrors("fullNameError", "");
    }

    if (e.target.name === "email") {
      handleSetErrors("emailError", "");
      return setData((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value + "@cphbusiness.dk",
      }));
    }

    if (e.target.name === "password") {
      handleSetErrors("passwordError", "");
    }

    if (e.target.name === "passwordConfirm") {
      handleSetErrors("passwordConfirmError", "");
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
        <div className="container--content ">
          <div className="form-outline mb-4">
            <input
              placeholder="Full name"
              name="fullName"
              type="text"
              className={`form-control ${fullNameError && "errorStyle"}`}
              onChange={handleChange}
            />
          </div>

          {fullNameError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {fullNameError}
            </div>
          )}

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
              name="password"
              type="password"
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

          <div className="form-outline mb-4">
            <input
              placeholder="Repeat password"
              name="passwordConfirm"
              type="password"
              className={`form-control ${passwordConfirmError && "errorStyle"}`}
              onChange={handleChange}
            />
          </div>

          {passwordConfirmError && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              {passwordConfirmError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={handleAction}
          >
            Sign up
          </button>

          <div className="text-center">
            <p>
              Already a member? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
