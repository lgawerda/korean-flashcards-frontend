import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/LogIn.css";
import { useNavigate } from "react-router-dom";

const LogIn = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:2500/user/log-in", {
        withCredentials: true,
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.headers);

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
          Log in
        </button>
      </form>
    </div>
  );
};

export default LogIn;
