import React, { useEffect, useState } from "react";
import Select from "react-select";
import { schoolGetApi } from "../../../utils/schoolApi";

export default function SchoolSelect() {
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

  const onChange = (e) => {
    console.log(e);
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
          isClearable={true}
          placeholder="위치"
          onInputChange={getSchool}
        />
      )}
    </>
  );
}
