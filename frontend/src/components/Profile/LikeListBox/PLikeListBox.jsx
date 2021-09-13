import React from "react";
import * as S from "../style";

export default function PLikeListBox({ likeList, handlepage, page, last }) {
  return (
    <S.LBCont>
      <S.LBTitle>즐겨찾기 목록</S.LBTitle>
      {page >= 1 ? (
        <S.LBprev onClick={handlepage("prev")}>이전</S.LBprev>
      ) : null}
      <S.LBContent>
        {likeList.map((post) => (
          <S.LBList key={post.id}>{post.title}</S.LBList>
        ))}
      </S.LBContent>
      {last === false ? (
        <S.LBnext onClick={handlepage("next")}>다음</S.LBnext>
      ) : null}
    </S.LBCont>
  );
}
