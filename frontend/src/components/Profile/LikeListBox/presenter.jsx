import React from "react";
import { bookmarkApi } from "../../../utils/feedApi";
import { Link } from "react-router-dom";
import Paging from "../../Common/Pagination";
import * as S from "../style";

export default function Presenter({
  likeList,
  handlepage,
  page,
  count,
  getLikeList,
}) {
  return (
    <S.LBCont>
      {likeList.length > 0 ? (
        <S.LBContent>
          {likeList.map((post) => (
            <LikeBox
              page={page}
              getLikeList={getLikeList}
              key={post.id}
              postInfo={post}
            />
          ))}
          <Paging page={page} count={count} setPage={handlepage} />
        </S.LBContent>
      ) : (
        <S.IfNoneWordCont>
          <p>아직 즐겨찾기에 추가된 실험이 없습니다.</p>
        </S.IfNoneWordCont>
      )}
    </S.LBCont>
  );
}

function LikeBox({ postInfo, getLikeList, page }) {
  const postBookmark = async (postId) => {
    await bookmarkApi(postId)
      .then(() => {
        window.alert("즐겨찾기에서 삭제되었습니다.");
        getLikeList(page);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <S.FeedTag>
        <p>{postInfo.postStatus === "RECRUIT" ? "모집중" : "모집완료"}</p>
      </S.FeedTag>
      <S.FeedCont>
        <S.FeedTitle>
          <p>실험명</p>
          <Link to={`/apply/${postInfo.id}`}>
            <p>{postInfo.title}</p>
          </Link>
        </S.FeedTitle>
        <S.FeedContent>
          <S.FeedDateNum>
            <p>실험장소</p>
            <p> {postInfo.place} /</p>
            <p>소요시간 </p>
            <p>약 {postInfo.doTime / 60}시간 내외</p>
          </S.FeedDateNum>
          <S.FeedTimeCheck>
            <p>보상 </p>
            <p>
              {postInfo.goods === null
                ? "현금 " + postInfo.cache + "원"
                : "물품" + postInfo.goods}
            </p>
            <p> 조건 여부</p>
            <p> {postInfo.recruitCondition ? "있음" : "없음"}</p>
          </S.FeedTimeCheck>
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await postBookmark(postInfo.id);
            }}
          >
            <p>삭제하기</p>
          </S.FeedBtn>
        </S.FeedContent>
      </S.FeedCont>
    </>
  );
}
