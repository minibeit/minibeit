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
              <PVImg img="/images/기본프로필.png" />
            )}
          </S.ImgBox>
          <S.UserInfoData>
            <p>
              <span>이름</span> : {bProfileInfo.name}
            </p>
            <p>
              <span>담당자</span> : {bProfileInfo.adminNickname}
            </p>
            <p>
              <span>주소</span> : <p>{bProfileInfo.place}</p>
            </p>
            <p>
              <span>소속인원</span> : {bProfileInfo.numberOfEmployees}명
            </p>
            <p>
              <span>전화번호</span> : {bProfileInfo.contact}
            </p>
          </S.UserInfoData>
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
