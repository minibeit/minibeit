import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet } from "../../../utils";
import BProfileNewModal from "../BProfileNewModal";
import * as S from "../style";

export default function PBProfileSection() {
  const [bprofiles, setbprofiles] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const UserId = useRecoilValue(userState).id;
  const openModal = () => {
    setIsShowing(true);
  };

  const closeModal = (data) => {
    if (data.type != "click") {
      getBprofile();
    }

    setIsShowing(false);
  };

  const getBprofile = async () => {
    try {
      const result = await bprofileListGet(UserId);

      const data = result.data;

      if (data) {
        setbprofiles(data);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getBprofile();
  }, []);

  return (
    <S.BPContainer>
      <S.BPbtn onClick={openModal}>비즈니스 프로필 생성하기</S.BPbtn>
      {bprofiles.map((bprofile) => (
        <Link key={bprofile.id} to={"/business/" + bprofile.id}>
          {" "}
          <div>{bprofile.name}</div>
        </Link>
      ))}
      <div>{isShowing && <BProfileNewModal closeModal={closeModal} />}</div>
    </S.BPContainer>
  );
}
