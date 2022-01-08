import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../../svg/플러스.svg";
import { bprofileListGet } from "../../../utils";
import { PVImg } from "../../Common";
import BProfileCreateModal from "../../Common/Modal/BProfileCreateModal";
import * as S from "../style";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";

export default function BusinessContainer() {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [BProfileList, setBProfileList] = useState([]);

  const getBProfile = useCallback(() => {
    bprofileListGet().then((res) => setBProfileList(res.data.data));
  }, []);

  const clickBProfile = (BProfile) => {
    let copy = { ...user };
    copy.bprofile = BProfile.id;
    setUser(copy);
    history.push(`/business/${BProfile.id}`);
  };

  useEffect(() => {
    getBProfile();
  }, [getBProfile]);

  return (
    <S.BusinessListBox>
      <S.BusinessHeader>
        <div>
          <p>어떤 프로필을 사용하여 참여자를 모집하시겠어요?</p>
          <p>
            사용하실 비즈니스 프로필을 골라보세요.
            <br />
            최대 3개까지 생성할 수 있어요.
          </p>
        </div>
      </S.BusinessHeader>
      <div>
        {BProfileList.map((a) => {
          return (
            <S.BusinessProfile key={a.id}>
              <div>
                <S.BImgBox onClick={() => clickBProfile(a)}>
                  {a.avatar ? (
                    <PVImg img={a.avatar} />
                  ) : (
                    <PVImg img="/images/기본비즈니스프로필.png" />
                  )}
                </S.BImgBox>
                <p>{a.name}</p>
              </div>
            </S.BusinessProfile>
          );
        })}
        {BProfileList.length < 3 && (
          <S.BusinessProfile>
            <S.ImgBox>
              <S.AddBProfileBtn onClick={() => setModalSwitch(true)}>
                <AddIcon />
              </S.AddBProfileBtn>
              {modalSwitch && (
                <BProfileCreateModal setModalSwitch={setModalSwitch} />
              )}
            </S.ImgBox>
          </S.BusinessProfile>
        )}
      </div>
    </S.BusinessListBox>
  );
}
