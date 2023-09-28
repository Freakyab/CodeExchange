"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
    console.log("user", user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
