import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";

import { userState } from "../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../utils";
import { feedAddfileApi } from "../../utils/feedApi";

import BProfileSelect from "./BProfileSelect";
import SchoolSelect from "./SchoolSelect";
import DateSelect from "./DateSelect";
import CategorySelect from "./CategorySelect";
import InfoData from "./InfoData";

export default function RecruitComponent() {
  const [recruit, setRecruit] = useState({
    businessProfile: {
      id: null,
      name: null,
    },
    school: {
      id: null,
      name: null,
    },
    startDate: null,
    endDate: null,
    headCount: 1,
    doTime: 30,
    startTime: null,
    endTime: null,
    timeList: [],
    dateList: null,
    exceptDateList: [],
    doDateList: [],
    category: null,
    title: "",
    content: "",
    condition: false,
    conditionDetail: [""],
    payment: "CACHE",
    pay: null,
    payMemo: null,
    images: [],
    address: "",
    detailAddress: "",
    contact: "",
  });
  const history = useHistory();
  const userId = useRecoilValue(userState).id;
  const isLogin = useRecoilValue(userState).isLogin;
  const [bpList, setbpList] = useState([]);

  const getbpList = useCallback(async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const submit = (recruit) => {
    return feedCreateApi(recruit)
      .then((res) => {
        if (recruit.images.length !== 0) {
          return feedAddfileApi(res.data.id, recruit.images)
            .then((res) => res)
            .catch((err) => err);
        } else {
          return res;
        }
      })
      .catch((err) => err);
  };

  const page = useRef();
  const movePage = (e) => {
    setTimeout(() => {
      const elementArr = page.current.childNodes;
      elementArr[e].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }, 50);
  };

  useEffect(() => {
    if (!isLogin) {
      history.push("/");
    }
  });

  useEffect(() => {
    getbpList();
  }, [getbpList]);

  return (
    <div ref={page}>
      <BProfileSelect
        movePage={movePage}
        bpList={bpList}
        recruit={recruit}
        setRecruit={setRecruit}
      />
      {recruit.businessProfile.id && (
        <SchoolSelect
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      )}
      {recruit.school.id && (
        <DateSelect
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      )}
      {recruit.doDateList.length !== 0 && (
        <CategorySelect
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      )}
      {recruit.category !== null && (
        <InfoData
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
          submit={submit}
        />
      )}
    </div>
  );
}
