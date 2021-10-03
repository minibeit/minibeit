import React from "react";
import ProfileFeed from "../../Common/FeedBox/ProfileFeed";
import Paging from "../../Common/Pagination";
import * as S from "../style";

export default function PJoinListBox({
  joinlist,
  getJoinlist,
  handlepage,
  paging,
  getCancellist,
  getFinishlist,
  state,
  page,
  count,
}) {
  return (
    <>
      {joinlist.length > 0 ? (
        <>
          {state === "CANCEL"
            ? joinlist.map((joinEle) => (
                <ProfileFeed
                  key={joinEle.id}
                  finish={false}
                  state="finish"
                  tag="참여 반려"
                  getCancellist={getCancellist}
                  feedInfo={joinEle}
                />
              ))
            : state === "FINISH"
            ? joinlist.map((joinEle) => (
                <ProfileFeed
                  key={joinEle.postDoDateId}
                  finish={true}
                  state="finish"
                  tag="참여 완료"
                  getFinishlist={getFinishlist}
                  feedInfo={joinEle}
                />
              ))
            : joinlist.map((joinEle) => (
                <ProfileFeed
                  key={joinEle.postDoDateId}
                  allow={joinEle.status === "APPROVE" ? true : false}
                  finish={false}
                  state="Join"
                  tag={joinEle.status === "APPROVE" ? "참여 확정" : "참여 대기"}
                  getJoinlist={getJoinlist}
                  feedInfo={joinEle}
                />
              ))}
          <Paging page={page} count={count} setPage={handlepage} />
        </>
      ) : (
        <S.IfNoneWordCont>
          {state === "WAIT" ? (
            <>
              <p>아직 실험에 참여하지 않으셨네요.</p>
              <S.IfNoneBtn onClick={() => window.location.replace("/apply")}>
                실험에 참여하러 가기
              </S.IfNoneBtn>
            </>
          ) : state === "APPROVE" ? (
            <p>아직 확정된 실험이 없습니다.</p>
          ) : state === "CANCEL" ? (
            <p>아직 반려된 실험이 없습니다.</p>
          ) : state === "FINISH" ? (
            <p>아직 완료된 실험이 없습니다.</p>
          ) : null}
        </S.IfNoneWordCont>
      )}
    </>
  );
}
