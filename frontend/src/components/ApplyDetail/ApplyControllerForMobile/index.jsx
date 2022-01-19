import moment from "moment";
import React from "react";
import toast from "react-hot-toast";

import * as S from "../style";

export default function ApplyControllerForMobile({
  apply,
  feedDetailData,
  checkLogin,
}) {
  const value =
    feedDetailData.payment === "CACHE"
      ? feedDetailData.cache + "원"
      : feedDetailData.goods;

  const handleCopyClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("복사되었습니다. 원하는곳에서 붙여넣기 해주세요!");
  };

  return (
    <S.RemoteBoxForMobile>
      <S.ControllerFM>
        <p>
          선택한
          <br />
          일정
        </p>
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
            <tr>
              <td> {feedDetailData.payment === "CACHE" ? "현금" : "물품"}</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </S.ApplyData>
        <S.ApplyBtnGroup>
          <S.ApplyBtn
            disabled={apply.postDoDateId ? false : true}
            onClick={checkLogin}
          >
            신청
          </S.ApplyBtn>
          <S.CopyBtn onClick={() => handleCopyClipBoard()}>공유</S.CopyBtn>
        </S.ApplyBtnGroup>
      </S.ControllerFM>
    </S.RemoteBoxForMobile>
  );
}
