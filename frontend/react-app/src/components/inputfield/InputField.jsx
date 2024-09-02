import React from "react";

export default function InputField({ type,value, name, placeholder,onChange ,className }) {
  return (
    <>
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className={className}></input>
    </>
  );
}
