import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import BProfileInfo from "./BProfileInfo";
import BProfileFeedList from "./BProfileFeedList";

import * as S from "./style";
import {
  getMakelistApi,
  getPreviewBProfileApi,
  viewBusinessReviewApi,
} from "../../utils";
import { useRecoilState } from "recoil";
import { BprofilePreview } from "../../recoil/preview";

export default function BProfileComponent({ businessId, view, page }) {
  const history = useHistory();
  const [feedData, setFeedData] = useState([]);
  const [totalEle, setTotalEle] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [feedPreview, setFeedPreview] = useRecoilState(BprofilePreview);

  const status = [
    { id: "created", value: "생성한 모집공고" },
    { id: "completed", value: "완료된 모집공고" },
    { id: "review", value: "후기 모아보기" },
  ];

  const getPreview = (createdItems) => {
    getPreviewBProfileApi(businessId).then((res) => {
      let copy = { ...feedPreview };
      copy.review = res.data.data.review;
      copy.complete = res.data.data.complete;
      if (createdItems) {
        copy.created = createdItems;
      }
      setFeedPreview(copy);
    });
  };

  const changeFeedData = useCallback(() => {
    setFeedData([]);
    switch (view) {
      case "created":
        getMakelistApi(businessId, page, "RECRUIT").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
          getPreview(res.data.data.totalElements);
        });
        break;
      case "completed":
        getMakelistApi(businessId, page, "COMPLETE").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
          getPreview();
        });
        break;
      case "review":
        viewBusinessReviewApi(businessId, page, 10).then((res) => {
          let reviewData = res.data.data.sort((a, b) => b.count - a.count);
          setReviewCount(reviewData.reduce((a, c) => a + c.count, 0));
          setFeedData(reviewData);
          getPreview();
        });
        break;
      default:
    }
    // eslint-disable-next-line
  }, [view, page]);

  useEffect(() => {
    changeFeedData(page);
  }, [changeFeedData, page]);

  return (
    <div>
      <S.ModeSelectBtn onClick={() => history.push("/profile?approve&1")}>
        개인 프로필
      </S.ModeSelectBtn>
      <S.ModeSelectBtn disabled={true}>비즈니스 프로필</S.ModeSelectBtn>
      <S.Container>
        <BProfileInfo businessId={businessId} feedPreview={feedPreview} />
        <S.FeedContainer>
          <BProfileFeedList
            page={page}
            status={status}
            view={view}
            businessId={businessId}
            feedData={feedData}
            reviewCount={reviewCount}
            totalEle={totalEle}
            changeFeedData={changeFeedData}
          />
        </S.FeedContainer>
      </S.Container>
    </div>
  );
}
