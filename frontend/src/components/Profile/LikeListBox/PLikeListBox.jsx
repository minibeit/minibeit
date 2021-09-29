import React from "react";
import * as S from "../style";

export default function PLikeListBox({ likeList, handlepage, page, last }) {
  return (
    <S.LBCont>
      {page > 1 ? (
        <S.LBprev onClick={async () => await handlepage("prev")}>이전</S.LBprev>
      ) : null}
      <S.LBContent>
        {likeList.map((post) => (
          <S.LBList key={post.id}>{post.title}</S.LBList>
        ))}
      </S.LBContent>
      {last === false ? (
        <S.LBnext onClick={async () => await handlepage("next")}>다음</S.LBnext>
      ) : null}
    </S.LBCont>
  );
}
