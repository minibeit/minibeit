import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import BProfileCreateModal from "./BProfileCreateModal";

import * as S from "../style";

export default function Presenter({
  modalSwitch,
  setModalSwitch,
  CreateBProfile,
  bprofiles,
  editfunc,
  msg,
  onClick,
  display,
  doDelete,
  goBProfile,
}) {
  return (
    <S.BPContainer2>
      {modalSwitch ? (
        <BProfileCreateModal
          setModalSwitch={setModalSwitch}
          CreateBProfile={CreateBProfile}
        />
      ) : null}
      {bprofiles.length > 0 ? (
        <S.BIContHead2>
          {" "}
          <S.BIContTitle>
            <p>사용하실 비즈니스 프로필을 선택해주세요</p>
          </S.BIContTitle>
          <S.BIEdit>
            <p onClick={editfunc}>{msg}</p>
          </S.BIEdit>
        </S.BIContHead2>
      ) : (
        <>
          <S.BIContHead>
            <p>📝</p>
            <p>접속할 비즈니스 프로필이 존재하지 않습니다.</p>
            <p> 비즈니스 프로필을 추가할까요?</p>
          </S.BIContHead>
          <S.BIWrapper>
            {" "}
            <S.BPbtn display="flex" onClick={onClick}>
              <AddIcon />
            </S.BPbtn>
          </S.BIWrapper>
        </>
      )}
      <S.BIWrapper>
        {bprofiles.map((bprofile) => (
          <div key={bprofile.id}>
            {bprofile.admin ? (
              <S.BIdelete
                display={display}
                onClick={async () => await doDelete(bprofile.id)}
              >
                <CloseIcon />
              </S.BIdelete>
            ) : null}

            <S.BIeleCont onClick={async () => await goBProfile(bprofile.id)}>
              <S.ImgBox>
                {bprofile.avatar !== null ? (
                  <S.UserImg src={bprofile.avatar} />
                ) : (
                  <S.UserImg src="/기본비즈니스프로필.jpeg" />
                )}
              </S.ImgBox>
              <S.BIeleName>
                <p>{bprofile.name}</p>
              </S.BIeleName>
            </S.BIeleCont>
          </div>
        ))}
        {bprofiles.length >= 3 ? null : (
          <S.BPbtn display={display} onClick={onClick}>
            <AddIcon />
          </S.BPbtn>
        )}
      </S.BIWrapper>
    </S.BPContainer2>
  );
}
