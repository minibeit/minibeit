import React, { useEffect, useState } from "react";
import Select from "react-select";
import { schoolGetApi } from "../../utils/schoolApi";

export default function SearchInput({ onChange, defaultValue }) {
  const [schools, setSchools] = useState([]);

  const getSchool = (text) => {
    schoolGetApi(text).then((res) => {
      const arr = [];
      for (var i = 0; i < res.data.data.length; i++) {
        arr.push({ label: res.data.data[i].name, value: res.data.data[i].id });
      }
      setSchools(arr);
    });
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
      justifyContent: "center",
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      color: "black",
      textAlign: "center",
      fontSize: "15px",
      fontWeight: "600",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "10rem",
    }),
  };
  useEffect(() => {
    getSchool();
  }, []);

  return (
    <>
      <Select
        options={schools}
        onChange={onChange}
        defaultValue={
          defaultValue
            ? schools.find((ele) => ele.value === defaultValue)
            : null
        }
        isClearable={true}
        placeholder="위치"
        styles={customStyles}
        onInputChange={getSchool}
      />
    </>
  );
}
