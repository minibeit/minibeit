import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";
import { PVImg } from "../../Common";

import BProfileEditModal from "./BProfileEditModal";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [bProfileInfo, setBProfileInfo] = useState();
  const [infoEditModal, setInfoEditModal] = useState(false);

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
              <PVImg img="/기본비즈니스프로필.jpeg" />
            )}
          </S.ImgBox>
          <button
            onClick={() => {
              setInfoEditModal(true);
            }}
          >
            수정하기
          </button>
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
        </div>
      )}
    </S.UserInfoContainer>
  );
}
