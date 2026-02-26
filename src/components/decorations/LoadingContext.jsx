import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, message, setMessage }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
