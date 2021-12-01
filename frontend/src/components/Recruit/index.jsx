import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useHistory } from "react-router";

import { userState } from "../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../utils";
import { feedAddfileApi } from "../../utils/feedApi";

import BProfileSelect from "./BProfileSelect";
import DataSelect from "./DataSelect";
import InfoData from "./InfoData";
import { recruitState } from "../../recoil/recruitState";

export default function RecruitComponent() {
  const [recruit, setRecruit] = useState(useRecoilValue(recruitState));
  const resetRecruit = useResetRecoilState(recruitState);
  const history = useHistory();
  const userId = useRecoilValue(userState).id;
  const isLogin = useRecoilValue(userState).isLogin;
  const [bpList, setbpList] = useState([]);
  const [askComplete, setAskComplete] = useState(0);

  const getbpList = useCallback(async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data.data))
      .catch();
  }, [userId]);

  const clickSubmit = () => {
    if (recruit.title !== "") {
      setAskComplete(1);
    } else {
      setAskComplete(2);
    }
  };

  const submit = (recruit) => {
    if (askComplete) {
      feedCreateApi(recruit)
        .then((res) => {
          if (recruit.images.length !== 0) {
            feedAddfileApi(res.data.data.id, recruit.images);
          }
          resetRecruit();
          history.push(`/recruit/complete/${res.data.data.id}`);
        })
        .catch((err) => {
          alert("게시물 작성에 실패했습니다");
          setAskComplete(0);
        });
    }
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
    }, 100);
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
      {recruit.businessProfile.id !== null && (
        <DataSelect
          recruit={recruit}
          setRecruit={setRecruit}
          movePage={movePage}
        />
      )}
      {recruit.category !== null && (
        <InfoData
          movePage={movePage}
          recruit={recruit}
          setRecruit={setRecruit}
          submit={submit}
          setAskComplete={setAskComplete}
          askComplete={askComplete}
          clickSubmit={clickSubmit}
        />
      )}
    </div>
  );
}
