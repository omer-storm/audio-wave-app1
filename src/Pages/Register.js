import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Navbar from "../Components/Navbar";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
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
      console.log("Passwords do not match");
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
    <div className="login-screen-bg">
      <div className="RegisterForm LoginFormPosition">
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
              />
            </div>
            <div className="BtnPosition">
              <button className="btn btn-light text-success">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
