import React from "react";
import BProfileFeed from "../../Common/FeedBox/BProfileFeed";
import * as S from "../style";

export default function PBMakeListBox({ makelist, paging, handlepage, state }) {
  return (
    <>
      <S.BoxTitle>{state === "new" ? "생성한 실험" : "완료된 실험"}</S.BoxTitle>
      {makelist.length > 0 ? (
        <>
          {makelist.map((makeEle) => (
            <BProfileFeed key={makeEle.id} state={state} feedInfo={makeEle} />
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
          {state === "new" ? (
            <p>아직 모집중인 실험이 없습니다.</p>
          ) : (
            <p>완료된 실험이 없습니다.</p>
          )}
        </S.IfNoneWordCont>
      )}
    </>
  );
}
