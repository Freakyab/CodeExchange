"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setIsLogin, setStatusInfo }) => {
  const [form, setForm] = useState({ username: "", password: "", name: "" });

  const handleSignup = async (e) => {
    e.preventDefault();

    // Form validation
    if (!form.username || !form.password || !form.name) {
      setStatusInfo({ success: false, message: "Please fill all the fields" });
      return;
    }

    try {
      const res = await fetch(
        // "https://code-exchange-backend.vercel.app/signup",
        "http://localhost:5000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
            name: form.name,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatusInfo({ success: true, message: "Signup Successful" });
        setIsLogin(true);
      } else {
        setStatusInfo({ success: false, message: "Signup Failed" });
      }
    } catch (err) {
      setStatusInfo({ success: false, message: "Signup Failed" });
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
        <span className="inline-flex">
          <h1 className="text-4xl py-2 font-bold text-center">
            Signup
            <span
              className="opacity-50 text-2xl font-normal ml-2 cursor-pointer hover:opacity-100"
              onClick={() => setIsLogin(true)}
            >
              | Login
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
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-slate-900 rounded-lg p-2 mb-5"
            name="name"
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
          <button className="bg-slate-900 text-white rounded-lg p-2" onClick={handleSignup}>
            Signup
          </button>
        </form>
        <ToastContainer />
      </motion.div>
    </>
  );
};

export default Signup;
