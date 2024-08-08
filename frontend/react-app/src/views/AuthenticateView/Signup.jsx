import React, { useEffect, useState } from "react";
import Label from "../../components/label/Label";
import InputField from "../../components/inputfield/InputField";
import AddButton from "../../components/buttons/AddButton";
import Required from "../../components/mandatory/Required";
import axios from "axios";
export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [role, setRole] = useState("Renter");

  const handleSubmit = async () => {
    alert(`${firstname} ${lastname} ${username} ${password} ${role}`);
    try {
      const res = await axios.post("http://localhost:9000/register", {
        firstname,
        lastname,
        username,
        password,
        role,
      });
      console.log("res from backend", res);
    } catch (err) {
      console.log("error in backend", err);
    }
  };

  const hadleShow = () => {
    setType("text");
  };
  const handleHide = () => {
    setType("password");
  };

  useEffect(()=>{
           const getFirstname=()=>{
            console.log("render")
           setFirstname("John")
           }
           getFirstname()
  },[firstname]);

  console.log("firstname",firstname);

  return (
    <div>
      Signup
      <div style={{ display: "flex" }}>
        <Label title="firstname" />
        <Required />
        <InputField
          type="text"
          name="firtsname"
          value={firstname}
          placeholder={`enter firstname ${firstname}`}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Label title="lastname" />
        <Required />
        <InputField
          type="text"
          name={lastname}
          value={lastname}
          placeholder="enter lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Label title="username" />
        <Required />

        <InputField
          type="text"
          name={username}
          value={username}
          placeholder="enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Label title="password" />
        <Required />

        <InputField
          type={type}
          name={password}
          value={password}
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <AddButton
          name={type == "text" ? "Hide" : "Show"}
          onClick={type == "text" ? () => handleHide() : () => hadleShow()}
          disabledStatus={password ? false : true}
        />
      </div>
      <AddButton
        name="Submit"
        onClick={() => handleSubmit()}
        disabledStatus={
          firstname && lastname && username && password ? false : true
        }
      />
    </div>
  );
}
