import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../../utils";
import { schoolGetApi } from "../../../utils/schoolApi";
import PFNContainer from "./PFNContainer";

function FNContainer() {
  const userId = useRecoilValue(userState).id;
  const history = useHistory();
  const [schoolList, setSchoolList] = useState([]);
  const [bpList, setbpList] = useState([]);
  const getSchoolList = async () => {
    try {
      const result = await schoolGetApi();
      if (result) {
        console.log(result);
        setSchoolList(result.data);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  const getbpList = async () => {
    try {
      const result = await bprofileListGet(userId);
      if (result) {
        setbpList(result.data);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getSchoolList();
    getbpList();
  }, []);
  const FNHandler = async (
    title,
    dueDate,
    doDate,
    payment,
    doTime,
    place,
    content,
    contact,
    files,
    schoolId,
    cache,
    goods,
    condition,
    conditionDetail
  ) => {
    try {
      const result = await feedCreateApi(
        title,
        dueDate,
        doDate,
        payment,
        doTime,
        place,
        content,
        contact,
        files,
        schoolId,
        cache,
        goods,
        condition,
        conditionDetail
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
  return (
    <PFNContainer
      bpList={bpList}
      schoolList={schoolList}
      FNHandler={FNHandler}
    />
  );
}
export default FNContainer;
