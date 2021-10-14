import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../../utils";

import PSelectBProfile from "./PSelectBProfile";
import PSchoolSelect from "./PSchoolSelect";
import PDateSelect from "./PDateSelect";
import PCategorySelect from "./PCategorySelect";
import PInfoData from "./PInfoData";
import PImgAndAddress from "./PImgAndAddress";
import { feedAddfileApi } from "../../../utils/feedApi";

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
    const elementArr = page.current.childNodes;
    elementArr[e].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    getbpList();
  }, [getbpList]);

  return (
    <div ref={page}>
      <div>
        <PSelectBProfile
          movePage={movePage}
          bpList={bpList}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      </div>
      <div>
        <PSchoolSelect
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      </div>
      <div>
        <PDateSelect
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
        />
      </div>
      <div>
        <PCategorySelect recruit={recruit} setRecruit={setRecruit} />
      </div>
      <div>
        <PInfoData recruit={recruit} setRecruit={setRecruit} />
        <PImgAndAddress
          recruit={recruit}
          setRecruit={setRecruit}
          submit={submit}
        />
      </div>
    </div>
  );
}
