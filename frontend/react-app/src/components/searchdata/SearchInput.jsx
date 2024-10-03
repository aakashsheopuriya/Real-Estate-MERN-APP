import { Select } from "antd";
import React, { useState } from "react";

export default function SearchInput(props) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  // Async function to handle search and fetch results
  const handleSearch = async (newValue) => {
    setValue(newValue);

    if (!newValue) {
      setData([]); // Clear data if no search value
      props.getSearchData([]);
      props.isSearch(false);
      return;
    }

    // Filter local data or fetch data from server
    const filterData = props.data.filter((item) =>
      item.title.toLowerCase().includes(newValue.toLowerCase())
    );

    if (filterData.length > 0) {
      setData(filterData);
      props.getSearchData(filterData);
      props.isSearch(true);
    } else {
      setData([]);
      props.getSearchData([]);
      props.isSearch(false);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue); // Set selected value
  };

  return (
    <div>
      <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={true}
        suffixIcon={null}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={"we can not find any property maching this key word"} // Can also add custom 'not found' message if needed
        options={data.map((d) => ({
          value: d.title,
          label: d.title,
        }))}
      />
    </div>
  );
}
