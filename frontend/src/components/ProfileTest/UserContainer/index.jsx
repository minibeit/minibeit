import React, { useEffect, useState } from "react";
import {
  getCancellistApi,
  getFinishlistApi,
  getJoinlistApi,
  getLikeListApi,
  getMyInfo,
} from "../../../utils";

import UserInfoEditModal from "./UserInfoEditModal";

import * as S from "../style";

export default function UserContainer() {
  const [userData, setUserData] = useState();
  const [feedSwitch, setFeedSwitch] = useState("대기중");
  const [feedData, setFeedData] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);

  const changeFeedData = (status) => {
    switch (status) {
      case "대기중":
        getJoinlistApi(1, "WAIT").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "확정":
        getJoinlistApi(1, "APPROVE").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "완료":
        getFinishlistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "반려":
        getCancellistApi(1).then((res) => setFeedData(res.data.data.content));
        break;
      case "즐겨찾기":
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
          {["대기중", "확정", "완료", "반려", "즐겨찾기"].map((a) => {
            return (
              <button
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
              <div>
                <S.FeedLabel>라벨</S.FeedLabel>
                <S.FeedBox key={a.id}>
                  <S.FeedTitleBox>
                    <p>게시글 제목</p>
                    <p>{a.title}</p>
                  </S.FeedTitleBox>
                  <S.FeedContentBox>
                    <div>
                      콘텐츠 디브
                      <p>{a.place}</p>
                      <p>{a.payment}</p>
                      <p>{a.recruitCondition}</p>
                    </div>
                    <div>버튼 디브</div>
                  </S.FeedContentBox>
                </S.FeedBox>
              </div>
            ))
          )}
        </S.FeedGroup>
      </S.FeedContainer>
    </S.Container>
  );
}
