import React from "react";
import ProfileFeed from "../../Common/FeedBox/ProfileFeed";
import * as S from "../style";

export default function PJoinListBox({
  joinlist,
  getJoinlist,
  handlepage,
  paging,
  getCancellist,
  getFinishlist,
  state,
}) {
  return (
    <>
      {joinlist.length > 0 ? (
        <>
          {state === "CANCEL"
            ? joinlist.map((joinEle) => (
                <ProfileFeed
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
          <S.ListPaging>
            {paging.first ? null : (
              <p onClick={async () => await handlepage("PREV")}>이전</p>
            )}
            {paging.last ? null : (
              <p onClick={async () => await handlepage("NEXT")}>다음</p>
            )}
          </S.ListPaging>
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
