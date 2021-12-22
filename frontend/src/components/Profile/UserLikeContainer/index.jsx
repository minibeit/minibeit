import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { ReactComponent as ArrowIcon } from "../../../svg/체크.svg";
import { getMyLikeListApi } from "../../../utils";
import { Pagination } from "../../Common";
import * as S from "../style";

export default function UserLikeContainer() {
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEle, setTotalEle] = useState(0);
  const history = useHistory();

  const changeFeedData = useCallback((page) => {
    getMyLikeListApi(page ? page : 1).then((res) => {
      setTotalEle(res.data.data.totalElements);
      setFeedData(res.data.data.content);
    });
  }, []);

  useEffect(() => {
    changeFeedData(page);
  }, [changeFeedData, page]);

  return (
    <S.LikeFeedContainer>
      <div onClick={() => history.push("/profile?approve")}>
        <ArrowIcon />
        뒤로가기
      </div>
      <div>관심공고 확인하기</div>
      <div>
        {feedData.map((a, i) => {
          return (
            <S.LikeFeedBox
              key={i}
              onClick={() => history.push(`/apply/${a.id}`)}
            >
              <S.FeedImgView thumbnail={a.thumbnail}>
                <div />
              </S.FeedImgView>
              <S.LikeFeedInfo>
                <div>{a.title}</div>
                <div>{a.businessProfile.name}</div>
                <div>
                  <S.LikePayment payment={a.payment}>
                    {a.payment === "CACHE" ? "현금" : "물품"}
                  </S.LikePayment>
                  <div>{a.doTime}분</div>
                </div>
                <S.RecruitTag recruit={a.recruitCondition}>
                  {a.recruitCondition ? "참여조건 있음" : "참여조건 없음"}
                </S.RecruitTag>
              </S.LikeFeedInfo>
            </S.LikeFeedBox>
          );
        })}
      </div>
      {feedData.length !== 0 && (
        <Pagination
          page={page}
          count={totalEle}
          setPage={setPage}
          onChange={(e) => changeFeedData(e)}
        />
      )}
    </S.LikeFeedContainer>
  );
}
