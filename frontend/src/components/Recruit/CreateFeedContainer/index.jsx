import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet } from "../../../utils";

import PSelectBProfile from "./PSelectBProfile";
import PSchoolSelect from "./PSchoolSelect";
import PDateSelect from "./PDateSelect";
import PTimeSelect from "./PTimeSelect";
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
    doTimeList: [],
    doDateList: null,
    exceptDateList: [],
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

  const getbpList = async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getbpList();
  }, []);

  console.log(recruit);
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
      {recruit.doDateList && (
        <PTimeSelect recruit={recruit} setRecruit={setRecruit} />
      )}

      <PCategorySelect recruit={recruit} setRecruit={setRecruit} />
      <PInfoData recruit={recruit} setRecruit={setRecruit} />
      <PImgAndAddress recruit={recruit} setRecruit={setRecruit} />
    </>
  );
}
