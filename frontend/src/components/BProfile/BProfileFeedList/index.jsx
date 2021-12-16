import React, { useCallback, useEffect, useState } from "react";
import { getMakelistApi } from "../../../utils";
import { useHistory } from "react-router";

import FeedBox from "./FeedBox";

import { Pagination } from "../../Common";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [feedData, setFeedData] = useState([]);
  const [feedSwitch, setFeedSwitch] = useState("생성한 모집공고");
  const [page, setPage] = useState(1);
  const [totalEle, setTotalEle] = useState(0);
  const history = useHistory();

  const changeFeedData = useCallback(
    (status, page) => {
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
          // reviewListGetApi(businessId, page ? page : 1, 10).then((res) => {
          //   setTotalEle(res.data.data.totalElements);
          //   setFeedData(res.data.data.content);
          // });
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
      <S.FeedGroup>
        {feedData.length === 0 ? (
          <S.NoneDiv>
            <p>아직 {feedSwitch}가 없네요.</p>
            {feedSwitch !== "생성한 모집공고" && (
              <p>먼저 모집공고를 올려보세요.</p>
            )}
            <button onClick={() => history.push("/recruit")}>
              모집공고 게시하기
            </button>
          </S.NoneDiv>
        ) : (
          feedData.map((a) => (
            <div key={a.id}>
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
    </>
  );
}
