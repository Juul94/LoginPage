import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ title, data, handleLogout, setProfileData }) {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/profile");
    }

    if (!authToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container--small shadow p-3 mb-5 bg-white rounded">
      <div className="heading--area mb-2">
        <h1 className="h1--title">{title}</h1>
      </div>

      <div className="container--content mt-0">
        <table className="table mb-4">
          <thead>
            <tr>
              <th scope="col">Full name</th>
              <td>{data.displayName}</td>
            </tr>
            <tr>
              <th scope="col">Email</th>
              <td>{data.email}</td>
            </tr>
          </thead>
        </table>
        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
