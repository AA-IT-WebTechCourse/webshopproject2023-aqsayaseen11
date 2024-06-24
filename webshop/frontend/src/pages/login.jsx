import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  let { loginUser } = useContext(UserContext);

  const loginHandler = (e) => {
    e.preventDefault();
    if (!e.target.username.value && !e.target.password.value) return;
    loginUser({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };
  return (
    <div className="container d-flex justify-content-center align-products-center vh-100">
      <div className="card">
        <div className="card-header">LOGIN</div>
        <form onSubmit={loginHandler} className="p-4">
          <input
            name="username"
            type="text"
            className="form-control"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-primary mt-4 w-100">
            LOGIN
          </button>
          <div className="mt-4">
            <Link to="/signup" className="login-link">
              Don't have an account yet? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
