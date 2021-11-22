import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
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
  const deleteOn = () => {
    setDeleteAlert(1);
  };

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
          <div>
            <S.BusinessHeader>
              <p>어떤 비즈니스 프로필을 사용하시겠어요?</p>
              <p>최대 3개까지 생성할 수 있어요</p>
            </S.BusinessHeader>
            {editMode ? (
              <button onClick={() => setEditMode(false)}>확인</button>
            ) : (
              <button onClick={() => setEditMode(true)}>수정</button>
            )}
          </div>
          <div>
            {BProfileList.map((a) => {
              return (
                <S.BusinessProfile key={a.id}>
                  <S.DeleteBtn
                    style={{
                      opacity: editMode && a.admin ? 1 : 0,
                      zIndex: editMode && a.admin ? 1 : -9999,
                    }}
                    onClick={deleteOn}
                  >
                    <CloseIcon />
                  </S.DeleteBtn>
                  <S.ImgBox onClick={() => history.push(`/business/${a.id}`)}>
                    {a.avatar ? (
                      <PVImg img={a.avatar} />
                    ) : (
                      <PVImg img="/images/기본비즈니스프로필.jpeg" />
                    )}
                  </S.ImgBox>
                  <p>{a.name}</p>
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
