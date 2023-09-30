"use client";
import Login from "./login";
import Signup from "./signup";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
constLoginPage = ({ setDisplayLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [statusInfo, setStatusInfo] = useState({});
  useEffect(() => {
    if (statusInfo.success) {
      toast.success(statusInfo.message);
    } else {
      toast.error(statusInfo.message);
    }
  }, [statusInfo]);
  return (
    <>
      <div className="z-10 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-10 rounded-lg shadow-2xl relative">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            onClick={() => setDisplayLogin(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />{" "}
            </svg>{" "}
          </button>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Signup setIsLogin={setIsLogin} setStatusInfo={setStatusInfo} />
          )}{" "}
        </div>{" "}
      </div>
      <ToastContainer />{" "}
    </>
  );
};
export default LoginPage;
