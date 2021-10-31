import React from "react";
import BProfileFeed from "../../Common/FeedBox/BProfileFeed";
import Paging from "../../Common/Pagination";
import * as S from "../style";

export default function Presenter({
  makelist,
  paging,
  page,
  count,
  handlepage,
  state,
  getMakelist,
}) {
  return (
    <>
      {makelist.length > 0 ? (
        <>
          {makelist.map((makeEle) => (
            <BProfileFeed
              key={makeEle.id}
              state={state}
              feedInfo={makeEle}
              getMakelist={getMakelist}
            />
          ))}
          <Paging page={page} count={count} setPage={handlepage} />
        </>
      ) : (
        <S.IfNoneWordCont>
          {state === "new" ? (
            <>
              <p>아직 모집중인 실험이 없습니다.</p>
              <S.IfNoneBtn onClick={() => window.location.replace("/recruit")}>
                실험 모집하러 가기
              </S.IfNoneBtn>
            </>
          ) : (
            <p>완료된 실험이 없습니다.</p>
          )}
        </S.IfNoneWordCont>
      )}
    </>
  );
}