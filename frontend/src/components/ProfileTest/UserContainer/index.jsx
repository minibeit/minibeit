import React, { useEffect, useState } from "react";
import {
  getCancellistApi,
  getFinishlistApi,
  getJoinlistApi,
  getLikeListApi,
  getMyInfo,
} from "../../../utils";

import UserInfoEditModal from "./UserInfoEditModal";
import FeedBox from "./FeedBox";

import * as S from "../style";

export default function UserContainer() {
  const [userData, setUserData] = useState();
  const [feedSwitch, setFeedSwitch] = useState("대기중");
  const [feedData, setFeedData] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);

  const changeFeedData = (status) => {
    switch (status) {
      case "대기중":
        setFeedData([]);
        getJoinlistApi(1, "WAIT").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "확정":
        setFeedData([]);
        getJoinlistApi(1, "APPROVE").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "완료":
        setFeedData([]);
        getFinishlistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "반려":
        setFeedData([]);
        getCancellistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "즐겨찾기":
        setFeedData([]);
        getLikeListApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      default:
    }
  };

  useEffect(() => {
    getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  }, []);
  useEffect(() => {
    getJoinlistApi(1, "WAIT").then((res) => setFeedData(res.data.data.content));
  }, []);

  return (
    <S.Container>
      <S.UserInfoContainer>
        {userData && (
          <>
            <S.ImgBox>
              {userData.avatar !== null ? (
                <S.UserImg src={userData.avatar} />
              ) : (
                <S.UserImg src="/기본프로필.png" />
              )}
            </S.ImgBox>
            <button onClick={() => setModalSwitch(true)}>수정하기</button>
            {modalSwitch ? (
              <UserInfoEditModal setModalSwitch={setModalSwitch} />
            ) : null}
            <div>이름 : {userData.name}</div>
            <div>닉네임 : {userData.nickname}</div>
            <div>성별 : {userData.gender === "MALE" ? "남자" : "여자"}</div>
            <div>생년월일 : {userData.birth}</div>
            <div>관심학교 : {userData.schoolName}</div>
            <div>직업 : {userData.job}</div>
            <div>전화번호 : {userData.phoneNum}</div>
          </>
        )}
      </S.UserInfoContainer>
      <S.FeedContainer>
        <S.CategoryBtnBox>
          {["대기중", "확정", "완료", "반려", "즐겨찾기"].map((a, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setFeedSwitch(a);
                  changeFeedData(a);
                }}
              >
                {a} 목록
              </button>
            );
          })}
        </S.CategoryBtnBox>
        <S.FeedGroup>
          {feedData.length === 0 ? (
            <div>{feedSwitch}</div>
          ) : (
            feedData.map((a) => (
              <div key={a.id}>
                <FeedBox status={feedSwitch} data={a} />
              </div>
            ))
          )}
        </S.FeedGroup>
      </S.FeedContainer>
    </S.Container>
  );
}
