import React from "react";
import { useHistory } from "react-router";

import FeedBox from "./FeedBox";
import BProfileReview from "./BProfileReview";

import { Pagination, PVImg } from "../../Common";

import * as S from "../style";

export default function BProfileInfo({
  page,
  setPage,
  feedSwitch,
  setFeedSwitch,
  feedData,
  reviewCount,
  totalEle,
  changeFeedData,
}) {
  const history = useHistory();

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
            <BProfileReview feedData={feedData} reviewCount={reviewCount} />
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
                  itemsCountPerPage={5}
                />
              )}
            </>
          )}
        </S.FeedGroup>
      )}
    </>
  );
}
