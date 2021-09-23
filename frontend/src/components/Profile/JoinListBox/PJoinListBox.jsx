import React from "react";
import ProfileFeed from "../../Common/FeedBox/ProfileFeed";
import * as S from "../style";

export default function PJoinListBox({
  joinlist,
  getJoinlist,
  state,
  handlepage,
  paging,
}) {
  return (
    <>
      <S.BoxTitle>
        {state === "APPROVE" ? "확정된 목록" : "대기중인 목록"}
      </S.BoxTitle>
      {joinlist.length > 0 ? (
        <>
          {joinlist.map((joinEle) => (
            <ProfileFeed
              key={joinEle.postDoDateId}
              allow={joinEle.status === "APPROVE" ? true : false}
              finish={false}
              state="Join"
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
