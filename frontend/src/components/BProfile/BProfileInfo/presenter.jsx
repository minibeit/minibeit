import React from "react";
import * as S from "../style";
import BProfileJoinModal from "./BProfileJoinModal";
import BProfileEditModal from "./BProfileEditModal";

export default function presenter({
  buserData,
  modalSwitch,
  modal2Switch,
  setModal2Switch,
  setModalSwitch,
}) {
  return (
    <S.UserInfoContainer>
      <S.ImgBox>
        {buserData.avatar !== null ? (
          <S.UserImg src={buserData.avatar} />
        ) : (
          <S.UserImg src="/기본비즈니스프로필.jpeg" />
        )}
      </S.ImgBox>
      {buserData.admin ? (
        <S.BProfileEdit onClick={() => setModal2Switch(true)}>
          <p>수정하기</p>
        </S.BProfileEdit>
      ) : null}
      <S.UserInfoBox>
        <S.UserInfo>
          <p>이름</p>
          <p>{buserData.name}</p>{" "}
        </S.UserInfo>
        <S.UserInfo>
          <p>담당자</p>
          <p>{buserData.adminName}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>주소</p> <p>{buserData.place}</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>소속 인원</p>
          <p>{buserData.numberOfEmployees} 명</p>
        </S.UserInfo>
        <S.UserInfo>
          <p>전화번호 </p>
          <p>{buserData.contact}</p>
        </S.UserInfo>
      </S.UserInfoBox>
      {modal2Switch ? (
        <BProfileEditModal
          businessId={buserData.id}
          setModal2Switch={setModal2Switch}
        />
      ) : null}
      {modalSwitch ? (
        <BProfileJoinModal
          businessId={buserData.id}
          setModalSwitch={setModalSwitch}
        />
      ) : null}
      {buserData.admin ? (
        <S.BPjoin onClick={() => setModalSwitch(true)}>
          <p>소속 인원 목록</p>
        </S.BPjoin>
      ) : null}
    </S.UserInfoContainer>
  );
}
