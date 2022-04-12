import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { authentication } from "./components/Firebase-config";
import { signOut } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    authentication.onAuthStateChanged(function (user) {
      setProfileData(user);
    });

    if (authToken) {
      navigate("/profile");
    }
  }, []);

  const handleLogout = () => {
    signOut(authentication);
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
          element={<Login title="Login" setProfileData={setProfileData} />}
        />

        <Route
          path="/signup"
          element={<Signup title="Sign up" setProfileData={setProfileData} />}
          exact
        />

        <Route
          path="/profile"
          element={
            <Profile
              title="Profile"
              data={profileData}
              handleLogout={handleLogout}
            />
          }
          exact
        />
      </Routes>
    </main>
  );
}

export default App;
