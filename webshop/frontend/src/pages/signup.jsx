import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";

export default function SignUp() {
  let { registerUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const registerHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!email && !username && !password && !confirmPassword) {
      enqueueSnackbar("Please enter all the fields", { variant: "error" });
      return;
    }
    registerUser({ email, username, password, confirmPassword });
  };

  return (
    <div className="container d-flex justify-content-center align-products-center vh-100">
      <div className="card">
        <div className="card-header">Register</div>
        <form onSubmit={registerHandler} className="p-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
          />
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
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm password"
          />
          <button type="submit" className="btn btn-primary mt-4 w-100">
            REGISTER
          </button>
          <div className="mt-4">
            <Link to="/login" className="login-link">
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
