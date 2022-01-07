import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getMyInfo } from "../../../../utils";

import UserInfoEditModal from "../UserInfoEditModal";

import { PVImg } from "../../../Common";
import * as S from "../../style";

export default function UserInfoBox({ feedPreview }) {
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
          <div>
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
            </div>

            <div>
              <S.ProfileBtn onClick={() => setModalSwitch(true)}>
                내 프로필 보기
              </S.ProfileBtn>
              <S.LikeBtn onClick={() => history.push(`/profile?like`)}>
                관심공고 확인하기
              </S.LikeBtn>
            </div>
          </div>
          {modalSwitch && (
            <UserInfoEditModal
              infoData={userData}
              getUserData={getUserData}
              setModalSwitch={setModalSwitch}
            />
          )}
          <S.FeedPreviewBox>
            <p>내신청 현황</p>
            <div>
              <S.PreviewTable>
                <thead>
                  <tr>
                    <td>대기</td>
                    <td>확정</td>
                    <td>반려</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{feedPreview.wait}</td>
                    <td
                      style={{
                        borderRight: "1px solid #c4c4c4",
                        borderLeft: "1px solid #c4c4c4",
                      }}
                    >
                      {feedPreview.approve}
                    </td>
                    <td>{feedPreview.reject}</td>
                  </tr>
                </tbody>
              </S.PreviewTable>
            </div>
          </S.FeedPreviewBox>
        </div>
      )}
    </S.UserInfoContainer>
  );
}
