import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew } from "../../../utils";
import CreateBProfileModal from "../../Common/Modal/CreateBProfileModal";

import * as S from "../style";

export default function PBProfileSection() {
  const [bprofiles, setbprofiles] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const UserId = useRecoilValue(userState).id;
  const onClick = () => {
    setModalSwitch(true);
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

  useEffect(() => {
    getBprofileList();
  }, []);

  return (
    <S.BPContainer>
      <S.BPbtn onClick={onClick}>비즈니스 프로필 생성하기</S.BPbtn>
      {modalSwitch ? (
        <CreateBProfileModal
          setModalSwitch={setModalSwitch}
          CreateBProfile={CreateBProfile}
        />
      ) : null}
      {bprofiles.map((bprofile) => (
        <Link key={bprofile.id} to={"/business/" + bprofile.id}>
          {" "}
          <div>{bprofile.name}</div>
        </Link>
      ))}
    </S.BPContainer>
  );
}
