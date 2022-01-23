import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getSearchUser } from "../../../../utils";
import toast from "react-hot-toast";

export default function UserSearch({ onChange, defaultValue }) {
  const [users, setUsers] = useState([]);
  const getUser = (input) => {
    if (input !== "") {
      getSearchUser(input)
        .then((res) => {
          const arr = [];
          for (var i = 0; i < res.data.data.length; i++) {
            arr.push({
              label: res.data.data[i].nickname,
              value: res.data.data[i].id,
            });
          }
          setUsers(arr);
        })
        .catch((err) => toast.error("유저를 불러오지 못했습니다"));
    }
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
      boxSizing: "border-box",
      background: "#fafafa",
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
      borderRadius: "8px",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "10rem",
    }),
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {users && (
        <Select
          options={users}
          onChange={onChange}
          isClearable={true}
          placeholder="유저"
          styles={customStyles}
          onInputChange={getUser}
        />
      )}
    </>
  );
}
