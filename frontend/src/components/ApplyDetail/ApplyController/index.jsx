import moment from "moment";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

import * as S from "../style";

export default function ApplyController({ apply, feedDetailData, checkLogin }) {
  const value =
    feedDetailData.payment === "CACHE"
      ? feedDetailData.cache + "원"
      : feedDetailData.goods;

  const handleCopyClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("복사되었습니다. 원하는곳에서 붙여넣기 해주세요!");
  };
  const num = useMemo(() => {
    return Math.floor(Math.random() * 10) + 1;
  }, []);
  return (
    <S.RemoteBox>
      <S.Controller>
        <p>선택한 일정</p>
        <S.ApplyData>
          <tbody>
            <tr>
              <td>날짜</td>
              <td>
                {apply.doDate && moment(apply.doDate).format("MM월 DD일")}
              </td>
            </tr>
            <tr>
              <td>시간</td>
              <td>{apply.doTime && apply.doTime}</td>
            </tr>
          </tbody>
        </S.ApplyData>
        <div>
          <div>금액</div>
          <S.PaymentLabel payment={feedDetailData.payment}>
            {feedDetailData.payment === "CACHE" ? "현금" : "물품"}
          </S.PaymentLabel>
          <div style={{ color: "#505050" }}>{value}</div>
        </div>
        <S.ApplyBtnGroup>
          <S.ViewNum>
            이 페이지를 <span>{num}</span>명이 보고 있습니다.
          </S.ViewNum>
          <S.ApplyBtn
            disabled={apply.postDoDateId ? false : true}
            onClick={checkLogin}
          >
            신청하기
          </S.ApplyBtn>
          <S.CopyBtn onClick={() => handleCopyClipBoard()}>공유하기</S.CopyBtn>
        </S.ApplyBtnGroup>
      </S.Controller>
    </S.RemoteBox>
  );
}
