import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../../utils";

import PSelectBProfile from "./PSelectBProfile";
import PSchoolSelect from "./PSchoolSelect";
import PDateSelect from "./PDateSelect";
import PCategorySelect from "./PCategorySelect";
import PInfoData from "./PInfoData";
import PImgAndAddress from "./PImgAndAddress";

export default function CreateFeedContainer() {
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
    category: "",
    title: "",
    content: "",
    condition: false,
    conditionDetail: [],
    payment: "cache",
    pay: null,
    payMemo: null,
    images: [],
    address: "",
    contact: "",
  });
  const userId = useRecoilValue(userState).id;
  const [bpList, setbpList] = useState([]);

  const getbpList = useCallback(async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const submit = (recruit) => {
    return feedCreateApi(recruit)
      .then((res) => res)
      .catch((err) => err);
  };

  useEffect(() => {
    getbpList();
  }, [getbpList]);

  return (
    <>
      {bpList && (
        <PSelectBProfile
          bpList={bpList}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      )}
      <PSchoolSelect recruit={recruit} setRecruit={setRecruit} />
      <PDateSelect recruit={recruit} setRecruit={setRecruit} />
      <PCategorySelect recruit={recruit} setRecruit={setRecruit} />
      <PInfoData recruit={recruit} setRecruit={setRecruit} />
      <PImgAndAddress
        recruit={recruit}
        setRecruit={setRecruit}
        submit={submit}
      />
    </>
  );
}
