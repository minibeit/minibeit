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
            <div>
              <span>이름</span>
              <span>{bProfileInfo.name}</span>
            </div>
            <div>
              <span>담당자</span>
              <span>{bProfileInfo.adminNickname}</span>
            </div>
            <div>
              <span>주소</span>
              <span>{bProfileInfo.place && "등록완료"}</span>
            </div>
            <div>
              <span>소속인원</span>
              <span>{bProfileInfo.numberOfEmployees}명</span>
            </div>
            <div>
              <span>전화번호</span>
              <span>{bProfileInfo.contact}</span>
            </div>
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
