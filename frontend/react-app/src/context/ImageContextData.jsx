import React, { createContext, useState } from "react";

export const ImageContextData = createContext();

export default function ImageContext({ children }) {
  const [imageNameData,setImageNameData] = useState("");

  return (
    <ImageContextData.Provider value={{imageNameData,setImageNameData}}>
      {children}
    </ImageContextData.Provider>
  );
}
