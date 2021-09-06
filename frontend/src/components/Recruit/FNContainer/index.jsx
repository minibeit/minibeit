import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import {
  bprofileListGet,
  feedCreateApi,
  feedDateCreateApi,
} from "../../../utils";
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
    payment,
    doTime,
    place,
    content,
    contact,
    schoolId,
    cache,
    goods,
    condition,
    conditionDetail,
    businessProfileId,
    startDay,
    endDay,
    startTime,
    endTime,
    files
  ) => {
    try {
      const result = await feedCreateApi(
        title,
        payment,
        doTime,
        place,
        content,
        contact,
        schoolId,
        cache,
        goods,
        condition,
        conditionDetail,
        businessProfileId,
        files
      );
      console.log("he");
      console.log(result);
      if (result) {
        console.log("success");
        const postId = result.data.id;
        const result2 = await feedDateCreateApi(
          postId,
          startDay,
          endDay,
          startTime,
          endTime
        );
        if (result2) {
          console.log(result2);
          window.alert("게시물 생성에 성공!");
          history.push(`/apply/${result.data.id}`);
        }
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
