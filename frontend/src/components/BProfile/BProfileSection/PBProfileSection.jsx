import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew, deleteBprofile } from "../../../utils";
import * as S from "../../BProfile/style";
import { BCreateCont } from "../../BProfileEdit";
import CloseIcon from "@mui/icons-material/Close";

export default function PBProfileSection() {
  const [bprofiles, setbprofiles] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [display, setdisplay] = useState("none");
  const [msg, setmsg] = useState("수정");

  const onClick = () => {
    setModalSwitch(true);
  };
  const doDelete = async (businessId) => {
    await deleteBprofile(businessId);
    alert("삭제되었습니다.");
    getBprofileList();
    setdisplay("none");
    setmsg("수정");
  };
  const getBprofileList = async () => {
    bprofileListGet()
      .then(async (res) => setbprofiles(res.data))
      .catch((err) => console.log(err));
  };
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
  }, []);
  const goBProfile = async (businessId) => {
    await setUser({ ...user, bpId: businessId });
    window.location.replace("/business/" + businessId);
  };
  return (
    <S.BPContainer2>
      {modalSwitch ? (
        <BCreateCont
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
        <S.BPbtn display={display} onClick={onClick}>
          <AddIcon />
        </S.BPbtn>
      </S.BIWrapper>
    </S.BPContainer2>
  );
}
