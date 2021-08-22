import React, { useEffect, useState } from "react";
import { feedlistApi } from "../../../utils";
import { filterState } from "../../../recoil/filterState";
import { useRecoilValue } from "recoil";
import PFeedListSection from "./PFeedListSection";
import * as S from "../style";

export default function FeedListSection() {
  //더미데이터는 category에서 받아온 엔드포인트로 하나의 카테코리에 헤당되는 데이터만 받아올것
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [endPage, setEndPage] = useState(1);
  const school = useRecoilValue(filterState).schoolId;
  const date = useRecoilValue(filterState).dateApi;
  const [totalElement, setTotalElement] = useState(1);

  const getFeedList = async () => {
    try {
      const result = await feedlistApi(school, date, page, size);
      if (result) {
        setPosts(result.post);
        setEndPage(result.endpage);
        setTotalElement(result.totalElement);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getFeedList();
  }, [school, date, page, size]);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElement / size); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      {posts.map((post) => (
        <PFeedListSection key={post.id} post={post} />
      ))}
      <p>{page} 페이지</p>
      <S.FLPageWrapper>
        <S.FLPageLists>
          {pageNumbers.map((number) => (
            <S.FLPageNumber key={number}>
              <S.FLPageButton
                onClick={() => {
                  setPage(number);
                }}
              >
                {number}
              </S.FLPageButton>
            </S.FLPageNumber>
          ))}
        </S.FLPageLists>
      </S.FLPageWrapper>
    </>
  );
}
