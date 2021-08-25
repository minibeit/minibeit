import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { feedCreateApi } from "../../../utils";
import { schoolGetApi } from "../../../utils/schoolApi";
import PFNContainer from "./PFNContainer";

function FNContainer() {
  const history = useHistory();
  const [schoolList, setSchoolList] = useState([]);
  const getSchoolList = async () => {
    try {
      const result = await schoolGetApi();
      if (result) {
        console.log(result);
        setSchoolList(result);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getSchoolList();
  }, []);
  const FNHandler = async (
    title,
    dueDate,
    doDate,
    pay,
    time,
    place,
    content,
    phoneNum,
    files,
    school
  ) => {
    try {
      const result = await feedCreateApi(
        title,
        dueDate,
        doDate,
        pay,
        time,
        place,
        content,
        phoneNum,
        files,
        school
      );
      console.log(result);
      if (result.id) {
        window.alert("게시물 생성에 성공!");
        history.push(`/feedList/${result.id}`);
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return <PFNContainer schoolList={schoolList} FNHandler={FNHandler} />;
}
export default FNContainer;
