import { Link } from "react-router-dom";

export default function Signup({
  title,
  setFullName,
  setEmail,
  setPassword,
  setPasswordConfirm,
  handleAction,
}) {
  return (
    <div className="container--small shadow p-3 mb-5 bg-white rounded">
      <div className="heading--area">
        <h1 className="h1--title">{title}</h1>
      </div>
      <div className="container--content ">
        <form>
          <div className="form-outline mb-4">
            <input
              placeholder="Full name"
              name="fullName"
              type="text"
              className="form-control"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-outline input-group mb-4 mr-sm-2">
            <input
              placeholder="Email"
              name="email"
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value + "@cphbusiness.dk")}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">@cphbusiness.dk</div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              placeholder="Repeat password"
              name="password_confirm"
              type="password"
              className="form-control"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            type="button"
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
        </form>
      </div>
    </div>
  );
}
