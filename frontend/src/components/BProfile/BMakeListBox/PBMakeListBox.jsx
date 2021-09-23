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
          <p>아직 후기가 작성되지 않았습니다.</p>
        </S.IfNoneWordCont>
      )}
    </>
  );
}
