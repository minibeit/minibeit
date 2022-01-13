import React from "react";
import { useHistory } from "react-router";

import FeedBox from "./FeedBox";
import BProfileReview from "./BProfileReview";

import { Pagination, PVImg } from "../../Common";

import * as S from "../style";

export default function BProfileInfo({
  page,
  status,
  businessId,
  feedData,
  view,
  reviewCount,
  totalEle,
  changeFeedData,
}) {
  const history = useHistory();

  return (
    <>
      <S.CategoryBtnBox>
        {status.map((a, i) => {
          return (
            <button
              key={i}
              onClick={() => history.push(`/business/${businessId}?${a.id}&1`)}
              disabled={a.id === view ? true : false}
            >
              {a.value}
            </button>
          );
        })}
      </S.CategoryBtnBox>
      {feedData && (
        <S.FeedGroup>
          {view === "review" ? (
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
                  onChange={(clickPage) =>
                    history.push(`/business/${businessId}?${view}&${clickPage}`)
                  }
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
