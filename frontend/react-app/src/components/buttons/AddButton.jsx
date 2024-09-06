import React from "react";

export default function AddButton({ name, onClick,disabledStatus,className}) {
  return (
    <div>
      <button className={className} onClick={onClick} disabled={disabledStatus} style={disabledStatus?{cursor:"not-allowed"}:{cursor:"pointer"}}>{name}</button>
    </div>
  );
}
