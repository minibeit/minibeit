import React from "react";
import ProfileFeed from "../../Common/FeedBox/ProfileFeed";
import * as S from "../style";

export default function PJoinListBox({
  joinlist,
  getJoinlist,
  handlepage,
  paging,
  getCancelist,
  state,
}) {
  console.log(joinlist);
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
                  getCancelist={getCancelist}
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
          <p>아직 실험에 참여하지 않으셨네요.</p>
          <S.IfNoneBtn onClick={() => window.location.replace("/apply")}>
            실험에 참여하러 가기
          </S.IfNoneBtn>
        </S.IfNoneWordCont>
      )}
    </>
  );
}
