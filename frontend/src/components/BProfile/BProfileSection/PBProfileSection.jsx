import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew, deleteBprofile } from "../../../utils";
import CreateBProfileModal from "../../Common/Modal/CreateBProfileModal";

import * as S from "../../BProfile/style";

export default function PBProfileSection() {
  const [bprofiles, setbprofiles] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const UserId = useRecoilValue(userState).id;
  const [display, setdisplay] = useState("none");
  const [msg, setmsg] = useState("수정");
  const nickname = useRecoilValue(userState).name;
  const link = "/user/" + nickname;
  const onClick = () => {
    setModalSwitch(true);
  };
  const doDelete = async (businessId) => {
    await deleteBprofile(businessId);
    alert("삭제되었습니다.");
    getBprofileList();
  };
  const getBprofileList = async () => {
    bprofileListGet(UserId)
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
      setdisplay("block");
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
    <S.BPContainer>
      <Link to={link}>
        {" "}
        <S.ProfileTab1>개인 프로필</S.ProfileTab1>
      </Link>
      <S.ProfileTab2>비즈니스 프로필</S.ProfileTab2>
      {modalSwitch ? (
        <CreateBProfileModal
          setModalSwitch={setModalSwitch}
          CreateBProfile={CreateBProfile}
        />
      ) : null}
      {bprofiles.length > 0 ? (
        <S.BIContHead>
          {" "}
          <S.BIContTitle>접속할 비즈니스 프로필을 선택해주세요</S.BIContTitle>
          <S.BIEdit onClick={editfunc}>{msg}</S.BIEdit>
        </S.BIContHead>
      ) : (
        <S.BIContHead>
          접속할 비즈니스 프로필이 존재하지 않습니다 비즈니스 프로필을
          추가할까요?
        </S.BIContHead>
      )}
      {bprofiles.map((bprofile) => (
        <div key={bprofile.id}>
          <S.BIdelete
            display={display}
            onClick={async () => await doDelete(bprofile.id)}
          >
            삭제
          </S.BIdelete>
          <S.BIeleCont onClick={async () => await goBProfile(bprofile.id)}>
            <S.ImgBox>
              {bprofile.avatar !== null ? (
                <S.UserImg src={bprofile.avatar} />
              ) : (
                <S.UserImg src="/기본비즈니스프로필.jpeg" />
              )}
            </S.ImgBox>
            <S.BIeleName>{bprofile.name}</S.BIeleName>
          </S.BIeleCont>
        </div>
      ))}
      <S.BPbtn onClick={onClick}>비즈니스 프로필 생성하기</S.BPbtn>
    </S.BPContainer>
  );
}
