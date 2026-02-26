import React, { createContext, useContext, useState } from "react";

const AvatarContext = createContext(null);

export const AvatarProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);

  return (
    <AvatarContext.Provider
      value={{
        image,
        setImage,
        isEdited,
        setIsEdited,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("useAvatar must be used inside AvatarProvider");
  return ctx;
};
