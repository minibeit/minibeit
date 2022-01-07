import React from "react";
import { ReactComponent as UserIcon } from "../../../../svg/유저.svg";
import { useHistory } from "react-router";
import { PVImg } from "../../../Common";

import * as S from "../../style";

export default function BProfileReview({ feedData, reviewCount }) {
  const history = useHistory();
  return (
    <>
      {reviewCount === 0 ? (
        <S.NoneDiv>
          <PVImg img="/images/검색결과없음.png" />
          <S.WhiteButton onClick={() => history.push("/recruit")}>
            실험자 모집하러 가기
          </S.WhiteButton>
        </S.NoneDiv>
      ) : (
        <S.RevievContainer>
          <S.ReviewIconContainer>
            <div>
              <S.ReviewIconBox>
                <img
                  src="/images/돈다발아이콘.png"
                  alt="img"
                  width={(feedData[2].count / reviewCount) * 100 * 3 + "%"}
                />
              </S.ReviewIconBox>
              <S.ReviewIcomMiddleBox>
                <div>
                  <img
                    src="/images/시간아이콘.png"
                    alt="img"
                    width={(feedData[0].count / reviewCount) * 100 * 3 + "%"}
                  />
                </div>
                <div>
                  <img
                    src="/images/웃는얼굴아이콘.png"
                    alt="img"
                    width={(feedData[1].count / reviewCount) * 100 * 3 + "%"}
                  />
                </div>
              </S.ReviewIcomMiddleBox>
              <S.ReviewIconBox>
                <img
                  src="/images/하트아이콘.png"
                  alt="img"
                  width={(feedData[3].count / reviewCount) * 100 * 3 + "%"}
                />
              </S.ReviewIconBox>
            </div>
          </S.ReviewIconContainer>
          <S.ReviewBar>
            {feedData.map((a) => (
              <S.ReviewItem
                width={`${parseInt((a.count / reviewCount) * 100)}%`}
              >
                <div />
                <S.ReviewInfo view={a.count === 0 && "none"}>
                  <p>
                    {a.id === 1 && "시간"}
                    {a.id === 2 && "흥미"}
                    {a.id === 3 && "보상"}
                    {a.id === 4 && "친절"}
                  </p>
                  <p>{`${parseInt((a.count / reviewCount) * 100)}%`}</p>
                </S.ReviewInfo>
              </S.ReviewItem>
            ))}
          </S.ReviewBar>
          <div style={{ width: "100%" }}>
            {feedData.map((a) => {
              return (
                <S.ReviewList key={a.id}>
                  <S.ReviewTitle>
                    {a.id === 1 && <p>시간</p>}
                    {a.id === 2 && <p>흥미</p>}
                    {a.id === 3 && <p>보상</p>}
                    {a.id === 4 && <p>친절</p>}
                  </S.ReviewTitle>
                  <p>{a.content}</p>
                  <S.ReviewCount>
                    <UserIcon />
                    <p>{a.count}</p>
                  </S.ReviewCount>
                </S.ReviewList>
              );
            })}
          </div>
        </S.RevievContainer>
      )}
    </>
  );
}
