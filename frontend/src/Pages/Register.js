import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError("password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div>
      <div className="RegisterForm LoginFormPosition">
        <div className="login-screen-img"></div>
        <div className="login-screen-img1"></div>
        <h6 className="loginMessage">Register to continue..</h6>

        <h2 className="LoginFormHeading">Register:</h2>
        <div className="LoginFormComponentsPosition">
          <form onSubmit={onSubmit}>
            <div className="InputTextAreaPosition">
              <label htmlFor="name"> Name </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control InputTextArea "
                value={name}
                placeholder="Enter Name"
                onChange={onChange}
                required
                style={{ fontSize: "1vw", width: "30vw" }}
              />
            </div>
            <div className="InputTextAreaPosition">
              <label htmlFor="email"> Email address </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control InputTextArea "
                value={email}
                placeholder="Enter Email"
                onChange={onChange}
                required
                style={{ fontSize: "1vw", width: "30vw" }}
              />
            </div>
            <div className="InputTextAreaPosition">
              <label htmlFor="password"> Password </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control InputTextArea "
                value={password}
                placeholder="Enter Password"
                onChange={onChange}
                required
                style={{ fontSize: "1vw", width: "30vw" }}
              />
            </div>
            <div className="InputTextAreaPosition">
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input
                id="confirmPassword"
                name="password2"
                type="password"
                className="form-control InputTextArea "
                value={password2}
                placeholder="Confirm Password"
                onChange={onChange}
                required
                style={{ fontSize: "1vw", width: "30vw" }}
              />
            </div>
            <button className="btn btn-light text-success">Register</button>
            <Link
              to="/login"
              className="text-light Link RegisterBtn"
              style={{
                position: "relative",
                fontSize: 18,
                left: "20%",
                fontWeight: "bold",
              }}
            >
              Go Back
            </Link>
            <p>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
