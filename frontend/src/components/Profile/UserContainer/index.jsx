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

export default function UserContainer() {
  const [userData, setUserData] = useState();
  const [feedSwitch, setFeedSwitch] = useState("확정");
  const [feedData, setFeedData] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalEle, setTotalEle] = useState(0);

  const changeFeedData = useCallback((status, page, likeType) => {
    switch (status) {
      case "확정":
        getJoinlistApi(page ? page : 1, "APPROVE").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
        });
        break;
      case "대기중":
        getJoinlistApi(page ? page : 1, "WAIT").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
        });
        break;
      case "완료":
        getFinishlistApi(page ? page : 1).then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
        });
        break;
      case "반려":
        getCancellistApi(page ? page : 1).then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
        });
        break;
      case "즐겨찾기":
        getLikeListApi(page ? page : 1, likeType ? likeType : "RECRUIT").then(
          (res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          }
        );
        break;
      default:
    }
  }, []);

  useEffect(() => {
    getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  useEffect(() => {
    changeFeedData(feedSwitch, page);
  }, [changeFeedData, feedSwitch, page]);

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
          {["확정", "대기중", "완료", "반려", "즐겨찾기"].map((a, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setPage(1);
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
          <S.LikeTypeSelect>
            {feedSwitch === "즐겨찾기" && (
              <select
                defaultValue="RECRUIT"
                onChange={(e) => {
                  changeFeedData(feedSwitch, page, e.target.value);
                }}
              >
                <option value="RECRUIT">모집중</option>
                <option value="COMPLETE">모집완료</option>
              </select>
            )}
          </S.LikeTypeSelect>
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
          {feedData.length !== 0 && (
            <Pagination
              page={page}
              count={totalEle}
              setPage={setPage}
              onChange={(e) => changeFeedData(feedSwitch, e)}
            />
          )}
        </S.FeedGroup>
      </S.FeedContainer>
    </S.Container>
  );
}
