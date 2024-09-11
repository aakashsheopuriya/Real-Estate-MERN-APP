import React from "react";
import Required from "../mandatory/Required";

export default function Label({title , className}) {
  return (
    <div>
      <label htmlFor={title} className="font-medium block text-gray-700" >{title}  <Required/></label>
    </div>
  );
}
