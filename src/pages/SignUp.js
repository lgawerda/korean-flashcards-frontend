import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/LogIn.css";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:2500/user/sign-up", data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="wrap-log-in" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <h2>Username</h2>
          <input
            {...register("username", {
              required: true,
            })}
          />
        </div>
        <div className="form-item">
          <h2>Password</h2>
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <button className="btn-log-in" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
