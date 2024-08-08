import React from "react";

export default function Label({title}) {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
    </div>
  );
}
