"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/session";
const Navbar = ({ setDisplayLogin }) => {
  const [displayText, setDisplayText] = useState("login");
  const { user,setUser } = useUser();
  useEffect(() => {
    if (user) {
      setDisplayText(user.name);
    } else {
      setDisplayText("login");
    }
  }, [user]);

  const handleClick = () => {
    if (user) {
      setDisplayLogin(false);
      setUser(null)
    } else {
      setDisplayLogin(true);
    }
  };

  return (
    <nav className="fixed w-full z-10 top-0 capitalize bg-gray-900 text-white p-4 flex justify-between">
      <p className="text-2xl font-bold">CodeExchange</p>
      <p
        className="text-xl font-semibold cursor-pointer"
        onClick={handleClick}>
        <span>{displayText != "login" ? "Hi , " : null}</span> {displayText}
      </p>
    </nav>
  );
};

export default Navbar;
