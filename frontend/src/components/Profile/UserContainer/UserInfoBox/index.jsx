import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getMyInfo } from "../../../../utils";

import UserInfoEditModal from "../UserInfoEditModal";

import { PVImg } from "../../../Common";
import * as S from "../../style";

export default function UserInfoBox() {
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);

  const getUserData = () => {
    getMyInfo()
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <S.UserInfoContainer>
      {userData && (
        <div>
          <S.ImgBox>
            {userData.avatar !== null ? (
              <PVImg img={userData.avatar} />
            ) : (
              <PVImg img="/images/기본프로필.png" />
            )}
          </S.ImgBox>
          <S.UserNameBox>
            <p>{userData.name}</p> <p>님</p>
          </S.UserNameBox>
          <S.ProfileBtn onClick={() => setModalSwitch(true)}>
            내 프로필 보기
          </S.ProfileBtn>
          <S.LikeBtn onClick={() => history.push(`/profile?like`)}>
            관심공고 확인하기
          </S.LikeBtn>
          {modalSwitch && (
            <UserInfoEditModal
              infoData={userData}
              getUserData={getUserData}
              setModalSwitch={setModalSwitch}
            />
          )}
        </div>
      )}
    </S.UserInfoContainer>
  );
}
