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
import { PVImg } from "../../Common";

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
          <div>
            <S.ImgBox>
              {userData.avatar !== null ? (
                <PVImg img={userData.avatar} />
              ) : (
                <PVImg img="/기본프로필.png" />
              )}
            </S.ImgBox>
            <button onClick={() => setModalSwitch(true)}>수정하기</button>
            {modalSwitch ? (
              <UserInfoEditModal
                infoData={userData}
                setModalSwitch={setModalSwitch}
              />
            ) : null}
            <S.UserInfoData>
              <p>이름 : {userData.name}</p>
              <p>닉네임 : {userData.nickname}</p>
              <p>성별 : {userData.gender === "MALE" ? "남자" : "여자"}</p>
              <p>생년월일 : {userData.birth}</p>
              <p>관심학교 : {userData.schoolName}</p>
              <p>직업 : {userData.job}</p>
              <p>전화번호 : {userData.phoneNum}</p>
            </S.UserInfoData>
          </div>
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
                disabled={a === feedSwitch ? true : false}
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
            feedData.map((a, i) => (
              <div key={i}>
                <FeedBox
                  status={feedSwitch}
                  data={a}
                  changeFeedData={changeFeedData}
                />
              </div>
            ))
          )}
        </S.FeedGroup>
      </S.FeedContainer>
    </S.Container>
  );
}
