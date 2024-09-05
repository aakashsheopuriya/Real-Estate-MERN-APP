import React from "react";
import Required from "../mandatory/Required";

export default function Label({title}) {
  return (
    <div>
      <label htmlFor={title}>{title} <Required/></label>
    </div>
  );
}
