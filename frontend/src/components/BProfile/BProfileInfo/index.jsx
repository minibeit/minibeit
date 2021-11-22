import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";
import { PVImg } from "../../Common";

import BProfileEditModal from "./BProfileEditModal";
import BProfileUserModal from "./BProfileUserModal";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [bProfileInfo, setBProfileInfo] = useState();
  const [infoEditModal, setInfoEditModal] = useState(false);
  const [userListModal, setUserListModal] = useState(false);

  useEffect(() => {
    getBprofileInfo(businessId).then((res) => {
      setBProfileInfo(res.data.data);
    });
  }, [businessId]);

  return (
    <S.UserInfoContainer>
      {bProfileInfo && (
        <div>
          <S.ImgBox>
            {bProfileInfo.avatar !== null ? (
              <PVImg img={bProfileInfo.avatar} />
            ) : (
              <PVImg img="/images/기본비즈니스프로필.jpeg" />
            )}
          </S.ImgBox>
          {bProfileInfo.admin && (
            <S.InfoEditBtn
              onClick={() => {
                setInfoEditModal(true);
              }}
            >
              수정하기
            </S.InfoEditBtn>
          )}
          {infoEditModal && (
            <BProfileEditModal
              businessId={businessId}
              infoData={bProfileInfo}
              setInfoEditModal={setInfoEditModal}
            />
          )}
          <S.UserInfoData>
            <p>이름 : {bProfileInfo.name}</p>
            <p>담당자 : {bProfileInfo.adminNickname}</p>
            <p>주소 : {bProfileInfo.place}</p>
            <p>소속인원 : {bProfileInfo.numberOfEmployees}명</p>
            <p>전화번호 : {bProfileInfo.contact}</p>
          </S.UserInfoData>
          {bProfileInfo.admin && (
            <S.UserListBtn onClick={() => setUserListModal(true)}>
              소속인원 목록
            </S.UserListBtn>
          )}
          {userListModal && (
            <BProfileUserModal
              businessId={businessId}
              setModalSwitch={setUserListModal}
            />
          )}
        </div>
      )}
    </S.UserInfoContainer>
  );
}
