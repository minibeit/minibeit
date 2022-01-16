import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  getMyRejectListApi,
  getMyFeedList,
  getPreviewProfileApi,
} from "../../../utils";

import UserInfoBox from "./UserInfoBox";
import FeedBox from "./FeedBox";

import { PVImg, Pagination } from "../../Common";
import * as S from "../style";
import { useRecoilState } from "recoil";
import { profilePreview } from "../../../recoil/preview";

export default function UserContainer({ view, page }) {
  const history = useHistory();
  const [feedData, setFeedData] = useState([]);
  const [totalEle, setTotalEle] = useState(0);
  const [feedPreview, setFeedPreview] = useRecoilState(profilePreview);

  const status = [
    { id: "approve", value: "확정된 목록" },
    { id: "wait", value: "대기중 목록" },
    { id: "complete", value: "완료한 목록" },
    { id: "reject", value: "반려된 목록" },
  ];
  const getPreview = (status, statusData) => {
    getPreviewProfileApi(status).then((res) => {
      let copy = { ...feedPreview };
      copy = { ...res.data.data };
      if (statusData !== undefined) {
        copy[status.toLowerCase()] = statusData;
      }
      setFeedPreview(copy);
    });
  };

  const changeFeedData = useCallback(
    () => {
      setFeedData();
      switch (view) {
        case "approve":
          getMyFeedList(page, "APPROVE").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
            getPreview("APPROVE", res.data.data.totalElements);
          });
          break;
        case "wait":
          getMyFeedList(page, "WAIT").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
            getPreview("WAIT", res.data.data.totalElements);
          });
          break;
        case "complete":
          getMyFeedList(page, "COMPLETE").then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
            getPreview("COMPLETE");
          });
          break;
        case "reject":
          getMyRejectListApi(page).then((res) => {
            setTotalEle(res.data.data.totalElements);
            setFeedData(res.data.data.content);
            getPreview("REJECT", res.data.data.totalElements);
          });
          break;
        default:
      }
    },
    // eslint-disable-next-line
    [view, page]
  );

  useEffect(() => {
    changeFeedData(page);
  }, [changeFeedData, page]);

  return (
    <>
      <UserInfoBox feedPreview={feedPreview} />
      <S.FeedContainer>
        <S.CategoryBtnBox>
          {status.map((a, i) => {
            return (
              <button
                key={i}
                onClick={() => history.push(`/profile?${a.id}&1`)}
                disabled={a.id === view ? true : false}
              >
                {a.value}
              </button>
            );
          })}
        </S.CategoryBtnBox>
        {feedData && (
          <S.FeedGroup>
            {feedData.length === 0 ? (
              <S.NoneDiv>
                <PVImg img="/images/검색결과없음.png" />
                <S.WhiteButton onClick={() => history.push("/apply")}>
                  실험에 참여하러 가기
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
                  history.push(`/profile?${view}&${clickPage}`)
                }
                itemsCountPerPage={5}
              />
            )}
          </S.FeedGroup>
        )}
      </S.FeedContainer>
    </>
  );
}
