import React, { useEffect, useState } from "react";
import Select from "react-select";
import { schoolGetApi } from "../../../utils/schoolApi";

export default function SchoolSelect({ onChange, defaultValue }) {
  const [schools, setSchools] = useState();

  const getSchool = (text) => {
    schoolGetApi(text).then((res) => {
      const arr = [];
      for (var i = 0; i < res.data.length; i++) {
        arr.push({ label: res.data[i].name, value: res.data[i].id });
      }
      setSchools(arr);
    });
  };

  //   clearIndicator
  // container
  // control
  // dropdownIndicator
  // group
  // groupHeading
  // indicatorsContainer
  // indicatorSeparator
  // input
  // loadingIndicator
  // loadingMessage
  // menu
  // menuList
  // menuPortal
  // multiValue
  // multiValueLabel
  // multiValueRemove
  // noOptionsMessage
  // option
  // placeholder
  // singleValue
  // valueContainer
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "50px",
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
  };

  useEffect(() => {
    getSchool();
  }, []);

  return (
    <>
      {schools && (
        <Select
          options={schools}
          onChange={onChange}
          defaultValue={schools[defaultValue - 1]}
          isClearable={true}
          placeholder="위치"
          styles={customStyles}
          onInputChange={getSchool}
        />
      )}
    </>
  );
}