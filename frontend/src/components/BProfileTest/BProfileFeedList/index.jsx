import React, { useEffect, useState } from "react";
import { getMakelistApi, reviewListGetApi } from "../../../utils";

import FeedBox from "./FeedBox";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [feedData, setFeedData] = useState([]);
  const [feedSwitch, setFeedSwitch] = useState("생성한 모집공고");

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
    getMakelistApi(businessId, 1, "RECRUIT").then((res) =>
      setFeedData(res.data.data.content)
    );
  }, [businessId]);

  return (
    <>
      <S.CategoryBtnBox>
        {["생성한 모집공고", "완료된 모집공고", "후기 모아보기"].map((a, i) => {
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
        })}
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
    </>
  );
}
