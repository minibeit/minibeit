import React, { useCallback, useEffect, useState } from "react";
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
import { PVImg, Pagination } from "../../Common";
import { useHistory } from "react-router";

export default function UserContainer({ view }) {
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [feedData, setFeedData] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalEle, setTotalEle] = useState(0);
  const [feedSwitch, setFeedSwitch] = useState("확정된 목록");

  const status = [
    { id: "approve", value: "확정된 목록" },
    { id: "wait", value: "대기중 목록" },
    { id: "complete", value: "완료한 목록" },
    { id: "reject", value: "반려된 목록" },
    { id: "like", value: "즐겨찾기 목록" },
  ];

  const changeFeedData = useCallback(
    (page) => {
      switch (view) {
        case "approve":
          getJoinlistApi(page ? page : 1, "APPROVE").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "wait":
          getJoinlistApi(page ? page : 1, "WAIT").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "complete":
          getFinishlistApi(page ? page : 1).then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "reject":
          getCancellistApi(page ? page : 1).then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "like":
          getLikeListApi(page ? page : 1).then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        default:
      }
    },
    [view]
  );

  useEffect(() => {
    getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  useEffect(() => {
    changeFeedData(page);
  }, [changeFeedData, page]);

  return (
    <S.Container>
      <S.UserInfoContainer>
        {userData && (
          <div>
            <S.ImgBox>
              {userData.avatar !== null ? (
                <PVImg img={userData.avatar} />
              ) : (
                <PVImg img="/images/기본프로필.png" />
              )}
            </S.ImgBox>
            <S.UserInfoData>
              <p>
                <span>이름</span> <span>: {userData.name}</span>
              </p>
              <p>
                <span>닉네임</span> <span>: {userData.nickname}</span>
              </p>
              <p>
                <span>성별</span>
                <span>: {userData.gender === "MALE" ? "남자" : "여자"}</span>
              </p>
              <p>
                <span>생년월일</span> <span>: {userData.birth}</span>
              </p>
              <p>
                <span>관심학교</span> <span>: {userData.schoolName}</span>
              </p>
              <p>
                <span>직업</span> <span>: {userData.job}</span>
              </p>
              <p>
                <span>전화번호</span> <span>: {userData.phoneNum}</span>
              </p>
            </S.UserInfoData>
            <button onClick={() => setModalSwitch(true)}>수정하기</button>
            {modalSwitch && (
              <UserInfoEditModal
                infoData={userData}
                setModalSwitch={setModalSwitch}
              />
            )}
          </div>
        )}
      </S.UserInfoContainer>
      <S.FeedContainer>
        <S.CategoryBtnBox>
          {status.map((a, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setPage(1);
                  setFeedSwitch(a.value);
                  history.push(`/profile/${a.id}`);
                }}
                disabled={a.id === view ? true : false}
              >
                {a.value}
              </button>
            );
          })}
        </S.CategoryBtnBox>
        <S.FeedGroup>
          {feedData.length === 0 ? (
            <S.NoneDiv>
              <p>아직 {feedSwitch}이 존재하지 않습니다.</p>
              <button onClick={() => history.push("/apply")}>
                실험에 참여하러 가기
              </button>
            </S.NoneDiv>
          ) : (
            feedData.map((a, i) => (
              <div key={i}>
                <FeedBox
                  status={view}
                  data={a}
                  changeFeedData={changeFeedData}
                />
              </div>
            ))
          )}
          {feedData.length !== 0 && (
            <Pagination
              page={page}
              count={totalEle}
              setPage={setPage}
              onChange={(e) => changeFeedData(e)}
            />
          )}
        </S.FeedGroup>
      </S.FeedContainer>
    </S.Container>
  );
}
