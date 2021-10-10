import React, { useCallback, useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew, deleteBprofile } from "../../../utils";
import AddIcon from "@mui/icons-material/Add";
import * as S from "../../BProfile/style";
import { BCreateCont } from "../../BProfileEdit";
import CloseIcon from "@mui/icons-material/Close";

export default function PBOtherProfile({ originalId }) {
  const [bprofiles, setbprofiles] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const UserId = useRecoilValue(userState).id;
  const [display, setdisplay] = useState("none");
  const [msg, setmsg] = useState("수정");

  const onClick = () => {
    setModalSwitch(true);
  };
  const doDelete = async (businessId) => {
    await deleteBprofile(businessId);
    alert("삭제되었습니다.");
    setdisplay("none");
    setmsg("수정");
    getBprofileList();
  };
  const getBprofileList = useCallback(async () => {
    bprofileListGet(UserId)
      .then(async (res) => setbprofiles(res.data))
      .catch((err) => console.log(err));
  }, [UserId]);
  const CreateBProfile = (inputs, img) => {
    bprofileNew(inputs, img)
      .then(() => {
        getBprofileList();
        setModalSwitch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editfunc = () => {
    if (display === "none") {
      setdisplay("flex");
      setmsg("완료");
    } else {
      setdisplay("none");
      setmsg("수정");
    }
  };

  useEffect(() => {
    getBprofileList();
  }, [getBprofileList]);
  const goBProfile = async (businessId) => {
    await setUser({ ...user, bpId: businessId });
    window.location.replace("/business/" + businessId);
  };
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
        <BCreateCont
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
