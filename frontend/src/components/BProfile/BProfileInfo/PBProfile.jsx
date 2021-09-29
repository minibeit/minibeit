import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import { userState } from "../../../recoil/userState";
import { deleteBprofile } from "../../../utils/bprofileApi";
import * as S from "../style";
import { useHistory } from "react-router";
import BProfileJoin from "../BProfileJoin";
import BProfileEditCont from "../../BProfileEdit/BProfileEditCont";

PBProfile.propTypes = {
  buserData: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default function PBProfile({ buserData }) {
  const [user, setUser] = useRecoilState(userState);
  const nickname = useRecoilValue(userState).name;
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modal2Switch, setModal2Switch] = useState(false);
  const doDelete = async () => {
    await deleteBprofile(buserData.id);
    setUser({ ...user, bpId: 0 });
    alert("삭제되었습니다.");
    window.location.replace("/user/" + nickname);
  };

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
        <BProfileEditCont
          businessId={buserData.id}
          setModal2Switch={setModal2Switch}
        />
      ) : null}
      {modalSwitch ? (
        <BProfileJoin
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
