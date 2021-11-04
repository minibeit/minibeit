import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew, deleteBprofile } from "../../../utils";

import Presenter from "./presenter";

export default function BProfileMain() {
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
      .then(async (res) => setbprofiles(res.data.data))
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
    <Presenter
      modalSwitch={modalSwitch}
      setModalSwitch={setModalSwitch}
      CreateBProfile={CreateBProfile}
      bprofiles={bprofiles}
      editfunc={editfunc}
      msg={msg}
      onClick={onClick}
      display={display}
      doDelete={doDelete}
      goBProfile={goBProfile}
    />
  );
}
