"use client";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useUser } from "../context/session";

const Login = ({ setIsLogin, setDisplayLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUser } = useUser();
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const responsePayload = jwt_decode(credentialResponse.credential);
      handleGoogleSignIn({
        username: responsePayload.email,
        password:
          responsePayload.email +
          responsePayload.family_name +
          responsePayload.given_name,
        name: responsePayload.given_name + " " + responsePayload.family_name,
      });
    },
  });

  const handleGoogleSignIn = async ({ username, password, name }) => {
    try {
      fetch("https://code-exchange-backend.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            fetch("https://code-exchange-backend.vercel.app/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: password,
                name: name,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                setUser(res);
                setDisplayLogin(false);
              });
            } else {
              setUser(res);
            setDisplayLogin(false);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    try {
      fetch("https://code-exchange-backend.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <span className="inline-flex">
        <h1 className="text-4xl py-2 font-bold text-center">
          Login
          <span
            className="opacity-50 text-2xl font-normal ml-2 cursor-pointer hover:opacity-100"
            onClick={() => setIsLogin(false)}>
            | Signup
          </span>
        </h1>
      </span>
      <form className="flex flex-col mt-10">
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-slate-900 rounded-lg p-2 mb-5"
          name="email"
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="border-2 border-slate-900 rounded-lg p-2 mb-5"
          name="password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />

        <button
          className="bg-slate-900 text-white rounded-lg p-2"
          onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
