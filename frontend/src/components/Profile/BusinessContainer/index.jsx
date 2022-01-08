import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../../svg/엑스.svg";
import { ReactComponent as AddIcon } from "../../../svg/플러스.svg";
import { ReactComponent as PenIcon } from "../../../svg/연필.svg";
import DeleteBProfile from "../../Common/Alert/DeleteBProfile";
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
  const [editMode, setEditMode] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

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
      {BProfileList.length === 0 ? (
        <S.NoneContainer>
          <div>
            <img src="images/달력아이콘.png" alt="달력" />
          </div>
          <p>모집 공고를 올리기 위해서는 비즈니스 프로필이 필요해요</p>
          <p>비즈니스 프로필을 생성할까요?</p>
          <div onClick={() => setModalSwitch(true)}>
            <AddIcon />
          </div>
        </S.NoneContainer>
      ) : (
        <>
          <S.BusinessHeader>
            <div>
              <p>어떤 프로필을 사용하여 참여자를 모집하시겠어요?</p>
              <p>
                사용하실 비즈니스 프로필을 골라보세요.
                <br />
                최대 3개까지 생성할 수 있어요.
              </p>
            </div>
            <S.BusinessEditBtn>
              {editMode ? (
                <button onClick={() => setEditMode(false)}>확인</button>
              ) : (
                <PenIcon onClick={() => setEditMode(true)} />
              )}
            </S.BusinessEditBtn>
          </S.BusinessHeader>
          <div>
            {BProfileList.map((a) => {
              return (
                <S.BusinessProfile key={a.id}>
                  <S.DeleteBtn
                    style={{
                      opacity: editMode && a.admin ? 1 : 0,
                      zIndex: editMode && a.admin ? 1 : -9999,
                    }}
                    onClick={() => setDeleteAlert(true)}
                  >
                    <CloseIcon />
                  </S.DeleteBtn>
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
                  {deleteAlert && (
                    <DeleteBProfile
                      BProfileId={a.id}
                      setDeleteAlert={setDeleteAlert}
                      getBProfile={getBProfile}
                    />
                  )}
                </S.BusinessProfile>
              );
            })}
            {BProfileList.length < 3 && (
              <S.BusinessProfile>
                <S.DeleteBtn
                  style={{
                    opacity: 0,
                    zIndex: -9999,
                  }}
                >
                  <CloseIcon />
                </S.DeleteBtn>
                <S.ImgBox>
                  <S.AddBProfileBtn onClick={() => setModalSwitch(true)}>
                    <AddIcon />
                  </S.AddBProfileBtn>
                </S.ImgBox>
              </S.BusinessProfile>
            )}
          </div>
        </>
      )}
      {modalSwitch && <BProfileCreateModal setModalSwitch={setModalSwitch} />}
    </S.BusinessListBox>
  );
}
