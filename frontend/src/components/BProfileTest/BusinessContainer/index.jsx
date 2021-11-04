import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import {
  bprofileListGet,
  getBprofileInfo,
  getMakelistApi,
  reviewListGetApi,
} from "../../../utils";

import FeedBox from "./FeedBox";

import * as S from "../style";
import { PVImg } from "../../Common";

export default function BusinessContainer({ businessId }) {
  const [bProfileData, setBProfileData] = useState();
  const [BProfileList, setBProfileList] = useState();
  const [feedSwitch, setFeedSwitch] = useState("생성한 모집공고");
  const [feedData, setFeedData] = useState([]);
  const history = useHistory();

  const changeFeedData = (status) => {
    switch (status) {
      case "생성한 모집공고":
        setFeedData([]);
        getMakelistApi(businessId, 1, "RECRUIT").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "완료된 모집공고":
        setFeedData([]);
        getMakelistApi(businessId, 1, "COMPLETE").then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      case "후기 모아보기":
        setFeedData([]);
        reviewListGetApi(businessId, 1, 10).then((res) =>
          setFeedData(res.data.data.content)
        );
        break;
      default:
    }
  };

  useEffect(() => {
    getBprofileInfo(businessId).then((res) => {
      setBProfileData(res.data.data);
    });
  }, [businessId]);

  useEffect(() => {
    bprofileListGet().then((res) => setBProfileList(res.data.data));
  }, []);

  useEffect(() => {
    getMakelistApi(businessId, 1, "RECRUIT").then((res) =>
      setFeedData(res.data.data.content)
    );
  }, [businessId]);

  return (
    <S.Container>
      <S.UserInfoContainer>
        {bProfileData && (
          <div>
            <S.ImgBox>
              {bProfileData.avatar !== null ? (
                <PVImg img={bProfileData.avatar} />
              ) : (
                <PVImg img="/기본비즈니스프로필.jpeg" />
              )}
            </S.ImgBox>
            <button>수정하기</button>
            <S.UserInfoData>
              <p>이름 : {bProfileData.name}</p>
              <p>담당자 : {bProfileData.adminNickname}</p>
              <p>주소 : {bProfileData.place}</p>
              <p>소속인원 : {bProfileData.numberOfEmployees}명</p>
              <p>전화번호 : {bProfileData.contact}</p>
            </S.UserInfoData>
          </div>
        )}
      </S.UserInfoContainer>
      <S.FeedContainer>
        <S.BusinessListBox>
          <p>프로필 목록</p>
          <div>
            {BProfileList &&
              bProfileData &&
              BProfileList.map((a) => {
                return (
                  a.id !== bProfileData.id && (
                    <S.BusinessProfile key={a.id}>
                      <S.ImgBox
                        onClick={() => history.push(`/businesstest/${a.id}`)}
                      >
                        {a.avatar ? (
                          <PVImg img={a.avatar} />
                        ) : (
                          <PVImg img="/기본비즈니스프로필.jpeg" />
                        )}
                      </S.ImgBox>
                      <p>{a.name}</p>
                    </S.BusinessProfile>
                  )
                );
              })}
            {BProfileList && BProfileList.length <= 3 && (
              <S.ImgBox>
                <S.AddBProfileBtn>
                  <AddIcon />
                </S.AddBProfileBtn>
              </S.ImgBox>
            )}
          </div>
        </S.BusinessListBox>
        <S.CategoryBtnBox>
          {["생성한 모집공고", "완료된 모집공고", "후기 모아보기"].map(
            (a, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setFeedSwitch(a);
                    changeFeedData(a);
                  }}
                  disabled={a === feedSwitch ? true : false}
                >
                  {a}
                </button>
              );
            }
          )}
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
