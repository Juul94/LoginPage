import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { authentication } from "./components/Firebase-config";

import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profileData, setProfileData] = useState("");

  const handleAction = (id) => {
    const checkDigit = /\d/;
    const checkSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const checkDomain = new RegExp(/^[A-Za-z0-9æøåÆØÅ._%+-]+@cphbusiness.dk$/);
    const checkLetters = /^[a-zA-ZæøåÆØÅ\s]*$/g;

    if (id === 1) {
      if (email === "") {
        return toast.error("Enter email");
      } else if (!checkDomain.test(email)) {
        return toast.error("Email must be a cphbusiness.dk email");
      } else if (password === "") {
        return toast.error("Enter a password");
      } else if (password.length < 6) {
        return toast.error("Password must be min 6 characters");
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
            toast.error("Wrong information");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("User not found");
          }
        });
    }

    if (id === 2) {
      if (fullName === "") {
        return toast.error("Enter full name");
      } else if (!checkLetters.test(fullName)) {
        return toast.error("Full name must only be letters (Spaces allowed)");
      } else if (email === "") {
        return toast.error("Enter email");
      } else if (!checkDomain.test(email)) {
        return toast.error("Email must be a cphbusiness.dk email");
      } else if (password === "") {
        return toast.error("Enter a password");
      } else if (password.length < 6) {
        return toast.error("Password must be min 6 characters");
      } else if (!checkDigit.test(password)) {
        return toast.error("Password must contain at least one digit");
      } else if (!checkSpecialChar.test(password)) {
        return toast.error(
          "Password must contain at least one special character"
        );
      } else if (password != passwordConfirm) {
        return toast.error("Passwords must match");
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
            toast.error("Email already in use");
          }
        });
    }
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    authentication.onAuthStateChanged(function (user) {
      // console.log(user);
      setProfileData(user);
    });

    if (authToken) {
      navigate("/profile");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    setProfileData(null);
    navigate("/");
  };

  return (
    <main>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <Login
              title="Login"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(1)}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              title="Sign up"
              setFullName={setFullName}
              setEmail={setEmail}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
              handleAction={() => handleAction(2)}
            />
          }
          exact
        />

        <Route
          path="/profile"
          element={
            <Profile
              title="Profile"
              data={profileData}
              handleLogout={handleLogout}
              setProfileData={setProfileData}
            />
          }
          exact
        />
      </Routes>
    </main>
  );
}

export default App;
