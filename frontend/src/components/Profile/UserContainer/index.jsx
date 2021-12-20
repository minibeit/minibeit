import React, { useCallback, useEffect, useState } from "react";
import {
  getMyRejectListApi,
  getMyFeedList,
  getMyInfo,
  getMyLikeListApi,
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
  const [, setFeedSwitch] = useState("확정된 목록");

  const status = [
    { id: "approve", value: "확정된 목록" },
    { id: "wait", value: "대기중 목록" },
    { id: "complete", value: "완료한 목록" },
    { id: "reject", value: "반려된 목록" },
  ];

  const getUserData = () => {
    getMyInfo()
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch();
  };

  const changeFeedData = useCallback(
    (page) => {
      switch (view) {
        case "approve":
          getMyFeedList(page ? page : 1, "APPROVE").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "wait":
          getMyFeedList(page ? page : 1, "WAIT").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "complete":
          getMyFeedList(page ? page : 1, "COMPLETE").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "reject":
          getMyRejectListApi(page ? page : 1).then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "like":
          getMyLikeListApi(page ? page : 1).then((res) => {
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
    getUserData();
  }, []);

  useEffect(() => {
    changeFeedData(page);
  }, [changeFeedData, page]);

  return (
    <S.Container>
      {view === "like" ? (
        <S.LikeFeedContainer>
          <div>관심공고 확인하기</div>
          <div>
            {feedData.map((a, i) => {
              return (
                <S.LikeFeedBox
                  key={i}
                  onClick={() => history.push(`/apply/${a.id}`)}
                >
                  <PVImg img={"/images/기본프로필.png"} />
                  <S.LikeFeedInfo>
                    <div>{a.title}</div>
                    <div>비즈니스 프로필 이름</div>
                    <div>
                      <S.LikePayment payment={a.payment}>
                        {a.payment === "CACHE" ? "현금" : "물품"}
                      </S.LikePayment>
                      <div>{a.doTime}분</div>
                    </div>
                    <S.RecruitTag recruit={a.recruitCondition}>
                      {a.recruitCondition ? "참여조건 있음" : "참여조건 없음"}
                    </S.RecruitTag>
                  </S.LikeFeedInfo>
                </S.LikeFeedBox>
              );
            })}
          </div>
          {feedData.length !== 0 && (
            <Pagination
              page={page}
              count={totalEle}
              setPage={setPage}
              onChange={(e) => changeFeedData(e)}
            />
          )}
        </S.LikeFeedContainer>
      ) : (
        <>
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
                <S.UserNameBox>
                  <p>{userData.name}</p> <p>님</p>
                </S.UserNameBox>
                <S.ProfileBtn onClick={() => setModalSwitch(true)}>
                  내 프로필 보기
                </S.ProfileBtn>
                <S.LikeBtn
                  onClick={() => {
                    setPage(1);
                    history.push(`/profile?like`);
                  }}
                >
                  관심공고 확인하기
                </S.LikeBtn>
                {modalSwitch && (
                  <UserInfoEditModal
                    infoData={userData}
                    getUserData={getUserData}
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
                      history.push(`/profile?${a.id}`);
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
                  <PVImg img="/images/검색결과없음.png" />
                  <S.WhiteButton onClick={() => history.push("/apply")}>
                    실험에 참여하러 가기
                  </S.WhiteButton>
                </S.NoneDiv>
              ) : (
                feedData.map((a, i) => (
                  <FeedBox
                    key={i}
                    status={view}
                    data={a}
                    changeFeedData={changeFeedData}
                  />
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
        </>
      )}
    </S.Container>
  );
}
