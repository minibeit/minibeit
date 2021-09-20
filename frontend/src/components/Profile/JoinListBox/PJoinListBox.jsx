import React from "react";
import ProfileFeed from "../../Common/FeedBox/ProfileFeed";
import * as S from "../style";

export default function PJoinListBox({ joinlist }) {
  return (
    <>
      <S.BoxTitle>신청한 목록</S.BoxTitle>
      {joinlist.length > 0 ? (
        joinlist.map((joinEle) => (
          <ProfileFeed
            allow={true}
            finish={false}
            state="Join"
            feedInfo={joinEle}
          />
        ))
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
