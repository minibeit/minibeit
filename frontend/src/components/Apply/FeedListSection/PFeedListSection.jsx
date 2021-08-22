import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "../style";

export default function PFeedListSection({ post }) {
  const { author, doDate, dueDate, id, place, title } = post;
  const history = useHistory();
  const detail = () => {
    history.push(`/feedList/${id}`);
  };
  return (
    <S.FLSectionWrapper onClick={detail}>
      <S.FLSectionTopWrapper>
        <S.FLSectionAuthor>
          <p>{author}</p>
        </S.FLSectionAuthor>
        <S.FLSectionDate>
          <p>{doDate}</p>
        </S.FLSectionDate>
        <S.FLSectionDate>
          <p>{dueDate}</p>
        </S.FLSectionDate>
      </S.FLSectionTopWrapper>
      <S.FLSectionBottomWrapper>
        <S.FLSectionTitle>
          <p>{title}</p>
        </S.FLSectionTitle>
        <S.FLSectionTitle>
          <p>{place}</p>
        </S.FLSectionTitle>
      </S.FLSectionBottomWrapper>
    </S.FLSectionWrapper>
  );
}
