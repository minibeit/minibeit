import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBprofileInfo } from "../../../utils";
import { ReactComponent as ArrowIcon } from "../../../svg/체크.svg";
import { PVImg } from "../../Common";

import BProfileEditModal from "./BProfileEditModal";
import BProfileUserModal from "./BProfileUserModal";

import * as S from "../style";

export default function BProfileInfo({ businessId }) {
  const [bProfileInfo, setBProfileInfo] = useState();
  const [infoEditModal, setInfoEditModal] = useState(false);
  const [userListModal, setUserListModal] = useState(false);
  const history = useHistory();

  const getBusiness = useCallback(() => {
    getBprofileInfo(businessId).then((res) => {
      setBProfileInfo(res.data.data);
    });
  }, [businessId]);

  useEffect(() => {
    getBusiness();
  }, [getBusiness]);

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
          <S.ChangeBProfile
            onClick={() => {
              history.push("/profile?business");
            }}
          >
            프로필 전환하기
            <ArrowIcon />
          </S.ChangeBProfile>
          <S.UserInfoData>
            <p>{bProfileInfo.name}</p> <p>님</p>
          </S.UserInfoData>
          {bProfileInfo.admin && (
            <S.InfoEditBtn
              onClick={() => {
                setInfoEditModal(true);
              }}
            >
              비즈니스 프로필 보기
            </S.InfoEditBtn>
          )}
          {infoEditModal && (
            <BProfileEditModal
              infoData={bProfileInfo}
              getBusiness={getBusiness}
              setInfoEditModal={setInfoEditModal}
            />
          )}
          {bProfileInfo.admin && (
            <S.UserListBtn onClick={() => setUserListModal(true)}>
              소속인원 보기
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
