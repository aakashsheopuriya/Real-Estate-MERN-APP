import React from "react";

export default function AddButton({ name, onClick,disabledStatus}) {
  return (
    <div>
      <button onClick={onClick} disabled={disabledStatus} style={disabledStatus?{cursor:"not-allowed"}:{cursor:"pointer"}}>{name}</button>
    </div>
  );
}
