import React, { useState } from "react";
import Label from "../../components/label/Label";
import InputField from "../../components/inputfield/InputField";
import AddButton from "../../components/buttons/AddButton";

export default function Regsiter() {
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const handleAddInputField = () => {
    console.log("calling handleAddInputField");
    setInputFields([...inputFields, {}]);
  };
  const handleRemoveInputField = (index) => {
    console.log("index", index);
    const list = [...inputFields];
    list.splice(index, 1);
    console.log("list", list);
    setInputFields(list);
  };
  const handleChangeValue = (e, index) => {
    const list = [...inputFields];
    list[index] = { value: e.target.value };
    console.log("list with value", list);
    setInputFields(list);
  };
  return (
    <div>
      Regsiter
      {inputFields.map((inputField, index) => {
        return (
          <>
            <Label title="username" />
            <div
              style={{
                display: "flex",
                textAlign: "center",
                alignContent: "center",
                justifyItems: "center",
                justifyItems: "center",
              }}
            >
              <InputField
                type="text"
                name="username"
                placeholder="enter username"
                value={inputField.value}
                onChange={(e) => handleChangeValue(e, index)}
              />
              {inputFields.length > 1 ? (
                <>
                  <AddButton
                    name="-"
                    onClick={(e) => handleRemoveInputField(index)}
                  />
                </>
              ) : (
                ""
              )}
              <p>{inputField.value}</p>
            </div>
          </>
        );
      })}
      <AddButton name="+" onClick={() => handleAddInputField()} />
    </div>
  );
}
