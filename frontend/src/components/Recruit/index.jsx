import React, { useCallback, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useHistory } from "react-router";

import { userState } from "../../recoil/userState";
import { bprofileListGet, feedCreateApi } from "../../utils";

import BProfileSelect from "./BProfileSelect";
import DataSelect from "./DataSelect";
import CategorySelect from "./CategorySelect";
import InfoData from "./InfoData";
import { recruitState } from "../../recoil/recruitState";
import toast from "react-hot-toast";

export default function RecruitComponent() {
  const [recruit, setRecruit] = useRecoilState(recruitState);
  const resetRecruit = useResetRecoilState(recruitState);
  const history = useHistory();
  const user = useRecoilValue(userState);
  const isLogin = useRecoilValue(userState).isLogin;
  const [bpList, setbpList] = useState([]);
  const [askComplete, setAskComplete] = useState(false);
  const [notEnough, setNotEnough] = useState(false);

  const getbpList = useCallback(async () => {
    await bprofileListGet(user.id)
      .then(async (res) => setbpList(res.data.data))
      .catch();
  }, [user.id]);

  const clickSubmit = () => {
    if (recruit.title !== "") {
      setAskComplete(true);
    } else {
      setNotEnough(true);
    }
  };

  const submit = (recruit) => {
    if (recruit.address === "") {
      toast.error("주소를 입력해주세요");
      setAskComplete(false);
    } else if (recruit.pay === null) {
      toast.error("보상을 입력해주세요");
      setAskComplete(false);
    } else if (recruit.contact === "") {
      toast.error("연락처를 입력해주세요");
      setAskComplete(false);
    } else {
      if (askComplete) {
        feedCreateApi(recruit)
          .then((res) => {
            resetRecruit();
            history.push(`/recruit/complete/${res.data.data.id}`);
          })
          .catch((err) => {
            toast.error("게시물 작성에 실패했습니다");
            setAskComplete(false);
          });
      }
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
    if (!isLogin) history.push("/");
  });

  useEffect(() => {
    getbpList();
  }, [getbpList]);

  useEffect(() => {
    return history.block((loca, action) => {
      if (!loca.pathname.includes("/recruit") && recruit.schoolId) {
        let value = window.confirm("변경내용이 저장되지 않을 수 있습니다");
        if (value) resetRecruit();
        return value;
      }
    });
  }, [history, resetRecruit, recruit.schoolId]);

  return (
    <div ref={page}>
      <BProfileSelect
        movePage={movePage}
        userBProfile={user.bprofile}
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
      {recruit.headCount !== 0 && (
        <CategorySelect
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
          notEnough={notEnough}
          setNotEnough={setNotEnough}
        />
      )}
    </div>
  );
}
