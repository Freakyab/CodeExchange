"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/session";
import { useRouter,usePathname } from "next/navigation";
const Navbar = ({ setDisplayLogin }) => {
  const [displayText, setDisplayText] = useState("login");
  const { user,setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      if (pathname === "/dashboard") {
        setDisplayText("logout");
      }else{
        setDisplayText("dashboard");
      }
    } else {
      setDisplayText("login");
      router.push("/");
    }

  }, [user]);

  const handleClick = () => {
    if (user) {
      if(pathname === "/dashboard"){
        setDisplayText("login");
        setUser(null);
      }else{
        setDisplayLogin(false);
        router.push("/dashboard");
      }
    } else {
      setDisplayLogin(true);
    }
  };

  return (
    <nav className="fixed w-full z-10 top-0 capitalize bg-gray-900 text-white p-4 flex justify-between">
      <p className="text-2xl font-bold cursor-pointer"
        onClick = {() => router.push('/')}
      >CodeExchange</p>
      <p className="text-xl font-semibold cursor-pointer" onClick={handleClick}>
        <span>{displayText}</span>
      </p>
    </nav>
  );
};

export default Navbar;
