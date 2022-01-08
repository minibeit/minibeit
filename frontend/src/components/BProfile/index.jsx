import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

import BProfileInfo from "./BProfileInfo";
import BProfileFeedList from "./BProfileFeedList";

import * as S from "./style";
import {
  getMakelistApi,
  getPreviewBProfileApi,
  viewBusinessReviewApi,
} from "../../utils";
import { useEffect } from "react";
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

  const changeFeedData = useCallback(
    (status, page) => {
      setFeedData();
      switch (status) {
        case "생성한 모집공고":
          getMakelistApi(businessId, page ? page : 1, "RECRUIT")
            .then((res) => {
              setTotalEle(res.data.data.totalElements);
              setFeedData(res.data.data.content);
              return res.data.data.totalElements;
            })
            .then((createdItems) =>
              getPreviewBProfileApi(businessId).then((res) =>
                setFeedPreview({ ...res.data.data, created: createdItems })
              )
            );
          break;
        case "완료된 모집공고":
          getMakelistApi(businessId, page ? page : 1, "COMPLETE").then(
            (res) => {
              setTotalEle(res.data.data.totalElements);
              setFeedData(res.data.data.content);
              let copy = { ...feedPreview };
              copy.complete = res.data.data.totalElements;
              setFeedPreview(copy);
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
    // eslint-disable-next-line
    [businessId, setFeedPreview]
  );

  useEffect(() => {
    changeFeedData(feedSwitch, page);
  }, [changeFeedData, feedSwitch, page]);

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
