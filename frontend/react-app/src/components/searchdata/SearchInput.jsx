import { Select } from "antd";
import React, { useState } from "react";

export default function SearchInput(props) {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
    //   fetch(newValue, setData);
         const filterData=props.data.filter((item)=>{
            return item.title.includes(newValue)
         })

         console.log("filterData",filterData);
         setData(filterData)

    };
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        // filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data|| []).map((d) => ({
          value: d.title,
          label: d.title,
        }))}
      />
    </div>
  );
}
