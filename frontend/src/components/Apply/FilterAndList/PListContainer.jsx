import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { dateState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";

PListContainer.propTypes = {
  feedList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cache: PropTypes.number,
      doTime: PropTypes.number.isRequired,
      isLike: PropTypes.bool.isRequired,
      likes: PropTypes.number.isRequired,
      goods: PropTypes.string,
      payment: PropTypes.string.isRequired,
      recruitCondition: PropTypes.bool.isRequired,
      recruitConditionDetail: PropTypes.string,
      startTime: PropTypes.array,
    })
  ),
  postBookmark: PropTypes.func.isRequired,
};

export default function PListContainer({ feedList, postBookmark }) {
  const date = useRecoilValue(dateState).date;
  const user = useRecoilValue(userState);
  const history = useHistory();

  const goToDetailPage = (e) => {
    history.push(`/apply/${e.target.id}?${moment(date).format("YYYY-MM-DD")}`);
  };

  const clickBookmark = (e) => {
    var target;
    if (e.target.nodeName === "path") {
      target = e.target.parentNode;
    } else {
      target = e.target;
    }
    postBookmark(target.id);
    if (target.style.color === "rgb(6, 66, 255)") {
      target.style.color = "";
      target.nextSibling.textContent =
        parseInt(target.nextSibling.textContent) - 1;
    } else {
      target.style.color = "rgb(6, 66, 255)";
      target.nextSibling.textContent =
        parseInt(target.nextSibling.textContent) + 1;
    }
  };

  return (
    <S.ListContainer>
      {feedList.length !== 0 ? (
        feedList.map((a) => {
          return (
            <S.FeedBox key={a.id}>
              <S.FeedHeader>
                <div>
                  <p id={a.id} onClick={goToDetailPage}>
                    {a.title}
                  </p>
                  <p>{a.businessProfileName}</p>
                </div>
                <div>
                  {user.isLogin && (
                    <BookmarkBorderIcon
                      id={a.id}
                      onClick={clickBookmark}
                      style={{ color: `${a.isLike ? "rgb(6, 66, 255)" : ""}` }}
                    />
                  )}
                  <p>{a.likes}</p>
                </div>
              </S.FeedHeader>
              <S.FeedInfoData>
                <p>소요시간: {a.doTime}분</p>
                {a.payment === "CACHE" ? (
                  <p>지급: {a.cache}원</p>
                ) : (
                  <p>지급: 상품</p>
                )}
                <p>필수조건: {a.recruitCondition ? "있음" : "없음"}</p>
              </S.FeedInfoData>
            </S.FeedBox>
          );
        })
      ) : (
        <p>실험이 없습니다</p>
      )}
    </S.ListContainer>
  );
}
