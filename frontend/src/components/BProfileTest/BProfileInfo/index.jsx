import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";
import { PVImg } from "../../Common";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [bProfileData, setBProfileData] = useState();

  useEffect(() => {
    getBprofileInfo(businessId).then((res) => {
      setBProfileData(res.data.data);
    });
  }, [businessId]);

  return (
    <S.UserInfoContainer>
      {bProfileData && (
        <div>
          <S.ImgBox>
            {bProfileData.avatar !== null ? (
              <PVImg img={bProfileData.avatar} />
            ) : (
              <PVImg img="/기본비즈니스프로필.jpeg" />
            )}
          </S.ImgBox>
          <button>수정하기</button>
          <S.UserInfoData>
            <p>이름 : {bProfileData.name}</p>
            <p>담당자 : {bProfileData.adminNickname}</p>
            <p>주소 : {bProfileData.place}</p>
            <p>소속인원 : {bProfileData.numberOfEmployees}명</p>
            <p>전화번호 : {bProfileData.contact}</p>
          </S.UserInfoData>
        </div>
      )}
    </S.UserInfoContainer>
  );
}
