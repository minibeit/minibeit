import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import * as S from "../../style";

export default function FeedBox({ status, data }) {
  return (
    <>
      <S.FeedLabel>
        {status === "생성한 모집공고" && "모집중"}
        {status === "완료된 모집공고" && "모집완료"}
        {status === "후기 모아보기" && "???"}
      </S.FeedLabel>
      <S.FeedBox>
        <S.FeedTitleBox>
          <p>게시글 제목</p>
          <p>{data.title}</p>
        </S.FeedTitleBox>
        <S.FeedContentBox>
          {status === "생성한 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  <StarBorderIcon />
                  {data.likes}
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button>참여자 관리</button>
                <button>모집종료</button>
              </S.FeedButton>
            </>
          )}
          {status === "완료된 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  <StarBorderIcon />
                  {data.likes}
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button>일정종료</button>
              </S.FeedButton>
            </>
          )}
          {status === "후기 모아보기" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>후기후기</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button>더보기</button>
              </S.FeedButton>
            </>
          )}
        </S.FeedContentBox>
      </S.FeedBox>
    </>
  );
}
