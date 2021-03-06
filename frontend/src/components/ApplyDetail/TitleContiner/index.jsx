import React from "react";
import { useRecoilState } from "recoil";

import { recruitState } from "../../../recoil/recruitState";
import { ReactComponent as HomeIcon } from "../../../svg/홈.svg";
import { ReactComponent as Star } from "../../../svg/별.svg";

import * as S from "../style";
import { useHistory } from "react-router-dom";

export default function TitleContainer({ feedDetailData, clickBookmark }) {
  const history = useHistory();
  const [recruit, setRecruit] = useRecoilState(recruitState);
  const copyTemplate = () => {
    const copy = { ...recruit };
    copy.title = feedDetailData.title;
    copy.condition = feedDetailData.recruitCondition;
    copy.content = feedDetailData.content;
    copy.contact = feedDetailData.contact;
    copy.address = feedDetailData.address;
    copy.detailAddress = feedDetailData.addressDetail;
    copy.payment = feedDetailData.payment;
    copy.pay =
      copy.payment === "CACHE" ? feedDetailData.cache : feedDetailData.goods;
    copy.payMemo = feedDetailData.paymentDetail;
    copy.businessProfile = {
      id: feedDetailData.businessProfileInfo.id,
      name: feedDetailData.businessProfileInfo.name,
    };
    copy.conditionDetail = feedDetailData.recruitConditionDetail
      ? feedDetailData.recruitConditionDetail
      : [""];
    setRecruit(copy);
    setTimeout(() => {
      history.push("/recruit");
    }, 200);
  };
  return (
    <S.TitleBox>
      <S.TitleContent>
        <p>{feedDetailData.category}</p>
        <div>
          <p>{feedDetailData.title}</p>
          <div>
            {feedDetailData.isMine && (
              <>
                <S.CopyTemplateBtn onClick={() => copyTemplate()}>
                  템플릿 복사하기
                </S.CopyTemplateBtn>
                <S.HoverBtnText>
                  템플릿 복사하기를 클릭하시면, 참여 상세 정보가 복사돼요!
                  <br />
                  (아쉽게도 위치, 날짜 등은 복사되지 않아요😂)
                </S.HoverBtnText>
              </>
            )}
            <S.TitleBookMark isLike={feedDetailData.isLike}>
              <Star onClick={() => clickBookmark(feedDetailData.id)} />
              <p>{feedDetailData.likes}</p>
            </S.TitleBookMark>
          </div>
        </div>
        <div>
          <HomeIcon />
          <p>{feedDetailData.businessProfileInfo.name}</p>
        </div>
      </S.TitleContent>
    </S.TitleBox>
  );
}
