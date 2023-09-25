"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
const Navbar = ({ displayLogin, setDisplayLogin }) => {
  const [displayText, setDisplayText] = useState("login");
  const { data: session } = useSession();

  const handleLogin = () => {
    if (session) {
      signOut();
    } else {
      setDisplayLogin(true);
    }
  };

  useEffect(() => {
    if (session) {
      setDisplayText(session.user.name);
    }
  }, [session]);
  return (
    <nav className="fixed w-full z-10 top-0 capitalize bg-gray-900 text-white p-4 flex justify-between">
      <p className="text-2xl font-bold">CodeExchange</p>
      <p className="text-xl font-semibold cursor-pointer" onClick={handleLogin}>
        {displayText}
      </p>
    </nav>
  );
};

export default Navbar;
