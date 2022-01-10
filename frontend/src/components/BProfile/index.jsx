import React, { useState, useEffect } from "react";
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

export default function BProfileComponent({ businessId }) {
  const history = useHistory();
  const [feedSwitch, setFeedSwitch] = useState("생성한 모집공고");
  const [page, setPage] = useState(1);
  const [feedData, setFeedData] = useState([]);
  const [totalEle, setTotalEle] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [feedPreview, setFeedPreview] = useRecoilState(BprofilePreview);

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

  const changeFeedData = (status, page) => {
    setFeedData();
    switch (status) {
      case "생성한 모집공고":
        getMakelistApi(businessId, page ? page : 1, "RECRUIT").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
          getPreview(res.data.data.totalElements);
        });
        break;
      case "완료된 모집공고":
        getMakelistApi(businessId, page ? page : 1, "COMPLETE").then((res) => {
          setTotalEle(res.data.data.totalElements);
          setFeedData(res.data.data.content);
          getPreview();
        });
        break;
      case "후기 모아보기":
        viewBusinessReviewApi(businessId, page ? page : 1, 10).then((res) => {
          setReviewCount(res.data.data.reduce((a, c) => a + c.count, 0));
          setFeedData(res.data.data);
          getPreview();
        });
        break;
      default:
    }
  };

  useEffect(() => {
    changeFeedData(feedSwitch, page);
    // eslint-disable-next-line
  }, [feedSwitch, page]);

  return (
    <div>
      <S.ModeSelectBtn onClick={() => history.push("/profile?approve")}>
        개인 프로필
      </S.ModeSelectBtn>
      <S.ModeSelectBtn disabled={true}>비즈니스 프로필</S.ModeSelectBtn>
      <S.Container>
        <BProfileInfo businessId={businessId} feedPreview={feedPreview} />
        <S.FeedContainer>
          <BProfileFeedList
            page={page}
            setPage={setPage}
            feedSwitch={feedSwitch}
            setFeedSwitch={setFeedSwitch}
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
