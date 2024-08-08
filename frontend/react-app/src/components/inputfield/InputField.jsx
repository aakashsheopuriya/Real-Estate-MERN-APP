import React from "react";

export default function InputField({ type,value, name, placeholder,onChange }) {
  return (
    <>
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}></input>
    </>
  );
}
