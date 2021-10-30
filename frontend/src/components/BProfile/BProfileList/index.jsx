import React, { useCallback, useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet, bprofileNew, deleteBprofile } from "../../../utils";

import Presenter from "./presenter";

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

  const goBProfile = async (businessId) => {
    await setUser({ ...user, bpId: businessId });
    window.location.replace("/business/" + businessId);
  };

  useEffect(() => {
    getBprofileList();
  }, [getBprofileList]);

  return (
    <Presenter
      bprofiles={bprofiles}
      editfunc={editfunc}
      msg={msg}
      modalSwitch={modalSwitch}
      setModalSwitch={setModalSwitch}
      CreateBProfile={CreateBProfile}
      onClick={onClick}
      originalId={originalId}
      display={display}
      doDelete={doDelete}
      goBProfile={goBProfile}
    />
  );
}
