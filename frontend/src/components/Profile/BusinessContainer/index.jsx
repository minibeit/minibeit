import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../../../svg/엑스.svg";
import { ReactComponent as AddIcon } from "../../../svg/플러스.svg";
import { ReactComponent as PenIcon } from "../../../svg/연필.svg";
import DeleteBProfile from "../../Common/Alert/DeleteBProfile";
import Recruting from "../../Common/Alert/Recruting";

import { bprofileListGet, deleteBprofile } from "../../../utils";
import { PVImg } from "../../Common";
import BProfileCreateModal from "../../Common/Modal/BProfileCreateModal";

import * as S from "../style";

export default function BusinessContainer() {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [BProfileList, setBProfileList] = useState();
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();

  const [deleteAlert, setDeleteAlert] = useState(0);

  const deleteBusiness = (data) => {
    if (deleteAlert === 1) {
      deleteBprofile(data.id)
        .then((res) => {
          setDeleteAlert(0);
          getBProfile();
        })
        .catch((err) => setDeleteAlert(2));
    }
  };

  const getBProfile = () => {
    bprofileListGet().then((res) => setBProfileList(res.data.data));
  };

  useEffect(() => {
    getBProfile();
  }, []);

  return (
    <S.Container>
      {BProfileList && (
        <S.BusinessListBox>
          <S.BusinessHeader>
            <div>
              <p>어떤 프로필을 사용하여 참여자를 모집하시겠어요?</p>
              {editMode ? (
                <button onClick={() => setEditMode(false)}>확인</button>
              ) : (
                <PenIcon onClick={() => setEditMode(true)} />
              )}
            </div>
            <p>
              사용하실 비즈니스 프로필을 골라보세요.
              <br />
              최대 3개까지 생성할 수 있어요.
            </p>
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
                    onClick={() => setDeleteAlert(1)}
                  >
                    <CloseIcon />
                  </S.DeleteBtn>
                  <div>
                    <S.BImgBox
                      onClick={() => history.push(`/business/${a.id}`)}
                    >
                      {a.avatar ? (
                        <PVImg img={a.avatar} />
                      ) : (
                        <PVImg img="/images/기본프로필.png" />
                      )}
                    </S.BImgBox>
                    <p>{a.name}</p>
                  </div>
                  {deleteAlert === 1 && (
                    <DeleteBProfile
                      a={a}
                      deleteBusiness={deleteBusiness}
                      setDeleteAlert={setDeleteAlert}
                    />
                  )}
                  {deleteAlert === 2 && (
                    <Recruting a={a} setDeleteAlert={setDeleteAlert} />
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
                  {modalSwitch && (
                    <BProfileCreateModal setModalSwitch={setModalSwitch} />
                  )}
                </S.ImgBox>
              </S.BusinessProfile>
            )}
          </div>
        </S.BusinessListBox>
      )}
    </S.Container>
  );
}
