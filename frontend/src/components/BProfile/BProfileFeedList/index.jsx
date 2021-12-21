import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getMakelistApi, viewBusinessReviewApi } from "../../../utils";
import { ReactComponent as UserIcon } from "../../../svg/유저.svg";

import FeedBox from "./FeedBox";

import { Pagination, PVImg } from "../../Common";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [feedData, setFeedData] = useState([]);
  const [feedSwitch, setFeedSwitch] = useState("생성한 모집공고");
  const [page, setPage] = useState(1);
  const [totalEle, setTotalEle] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const history = useHistory();

  const changeFeedData = useCallback(
    (status, page) => {
      setFeedData();
      switch (status) {
        case "생성한 모집공고":
          getMakelistApi(businessId, page ? page : 1, "RECRUIT").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
          });
          break;
        case "완료된 모집공고":
          getMakelistApi(businessId, page ? page : 1, "COMPLETE").then(
            (res) => {
              setTotalEle(res.data.data.totalElements);
              setFeedData(res.data.data.content);
            }
          );
          break;
        case "후기 모아보기":
          viewBusinessReviewApi(businessId, page ? page : 1, 10).then((res) => {
            setReviewCount(res.data.data.reduce((a, c) => a + c.count, 0));
            setFeedData(res.data.data);
          });
          break;
        default:
      }
    },
    [businessId]
  );

  useEffect(() => {
    changeFeedData(feedSwitch, page);
  }, [changeFeedData, feedSwitch, page]);

  return (
    <>
      <S.CategoryBtnBox>
        {["생성한 모집공고", "완료된 모집공고", "후기 모아보기"].map((a, i) => {
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
              {a}
            </button>
          );
        })}
      </S.CategoryBtnBox>
      {feedData && (
        <S.FeedGroup>
          {feedSwitch === "후기 모아보기" ? (
            <>
              <S.ReviewImgBox>준비중입니다</S.ReviewImgBox>
              <S.ReviewBar>
                {reviewCount === 0 ? (
                  <p>등록된 리뷰가 없습니다</p>
                ) : (
                  <>
                    {feedData.map((a) => (
                      <S.ReviewItem
                        width={`${parseInt((a.count / reviewCount) * 100)}%`}
                      >
                        <div />
                        <S.ReviewInfo view={a.count === 0 && "none"}>
                          <p>
                            {a.id === 1 && "시간"}
                            {a.id === 2 && "흥미"}
                            {a.id === 3 && "보상"}
                            {a.id === 4 && "친절"}
                          </p>
                          <p>{`${parseInt((a.count / reviewCount) * 100)}%`}</p>
                        </S.ReviewInfo>
                      </S.ReviewItem>
                    ))}
                  </>
                )}
              </S.ReviewBar>
              <div style={{ width: "100%" }}>
                {feedData.map((a) => {
                  return (
                    <S.ReviewList key={a.id}>
                      <S.ReviewTitle>
                        {a.id === 1 && <p>시간</p>}
                        {a.id === 2 && <p>흥미</p>}
                        {a.id === 3 && <p>보상</p>}
                        {a.id === 4 && <p>친절</p>}
                      </S.ReviewTitle>
                      <p>{a.content}</p>
                      <S.ReviewCount>
                        <UserIcon />
                        <p>{a.count}</p>
                      </S.ReviewCount>
                    </S.ReviewList>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {feedData.length === 0 ? (
                <S.NoneDiv>
                  <PVImg img="/images/검색결과없음.png" />
                  <S.WhiteButton onClick={() => history.push("/recruit")}>
                    실험자 모집하러 가기
                  </S.WhiteButton>
                </S.NoneDiv>
              ) : (
                feedData.map((a, i) => (
                  <FeedBox
                    key={i}
                    status={feedSwitch}
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
                  onChange={(e) => changeFeedData(feedSwitch, e)}
                />
              )}
            </>
          )}
        </S.FeedGroup>
      )}
    </>
  );
}
