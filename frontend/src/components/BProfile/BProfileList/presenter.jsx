import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import BProfileCreateModal from "../BProfileMain/BProfileCreateModal";

import * as S from "../style";

export default function PBOtherProfile({
  bprofiles,
  editfunc,
  msg,
  modalSwitch,
  setModalSwitch,
  CreateBProfile,
  onClick,
  originalId,
  display,
  doDelete,
  goBProfile,
}) {
  return (
    <S.BPContainer>
      <S.BOtherHead>
        <p>프로필 목록</p>
        {bprofiles.length === 1 ? null : (
          <S.BIEdit>
            <p onClick={editfunc}>{msg}</p>
          </S.BIEdit>
        )}
      </S.BOtherHead>

      {modalSwitch ? (
        <BProfileCreateModal
          setModalSwitch={setModalSwitch}
          CreateBProfile={CreateBProfile}
        />
      ) : null}
      {bprofiles.length === 1 ? (
        <S.BPbtn onClick={onClick}>
          <AddIcon />
        </S.BPbtn>
      ) : (
        <S.BIWrapper>
          {bprofiles.map((bprofile) => {
            if (parseInt(bprofile.id) !== originalId) {
              return (
                <div key={bprofile.id}>
                  {bprofile.admin ? (
                    <S.BIdelete
                      display={display}
                      onClick={async () => await doDelete(bprofile.id)}
                    >
                      <CloseIcon />
                    </S.BIdelete>
                  ) : null}
                  <S.BIeleCont
                    onClick={async () => await goBProfile(bprofile.id)}
                  >
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
              );
            } else {
              return null;
            }
          })}
          {bprofiles.length >= 3 ? null : (
            <S.BPbtn onClick={onClick}>
              <AddIcon />
            </S.BPbtn>
          )}
        </S.BIWrapper>
      )}
    </S.BPContainer>
  );
}
