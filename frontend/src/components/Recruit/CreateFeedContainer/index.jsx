import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { bprofileListGet } from "../../../utils";

import PSelectBProfile from "./PSelectBProfile";
import PSchoolSelect from "./PSchoolSelect";
import PDateSelect from "./PDateSelect";
import PTimeSelect from "./PTimeSelect";
import PCategorySelect from "./PCategorySelect";
import PInfoData from "./PInfoData";
import PImgAndAddress from "./PImgAndAddress";

export default function CreateFeedContainer() {
  const userId = useRecoilValue(userState).id;
  const [bpList, setbpList] = useState([]);

  const getbpList = async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getbpList();
  }, []);

  return (
    <>
      {bpList && <PSelectBProfile bpList={bpList} />}
      <PSchoolSelect />
      <PDateSelect />
      <PTimeSelect />
      <PCategorySelect />
      <PInfoData />
      <PImgAndAddress />
    </>
  );
}
