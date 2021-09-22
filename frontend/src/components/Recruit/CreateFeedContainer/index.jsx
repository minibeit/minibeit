import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import {
  bprofileListGet,
  feedCreateApi,
  feedDateCreateApi,
} from "../../../utils";

import PSelectBProfile from "./PSelectBProfile";
import PSchoolSelect from "./PSchoolSelect";
import PDateSelect from "./PDateSelect";
import PTimeSelect from "./PTimeSelect";

export default function CreateFeedContainer() {
  const userId = useRecoilValue(userState).id;
  const history = useHistory();
  const [bpList, setbpList] = useState([]);

  const getbpList = async () => {
    await bprofileListGet(userId)
      .then(async (res) => setbpList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getbpList();
  }, []);
  const FNHandler = async (infoinputs, dateinputs, files) => {
    await feedCreateApi(infoinputs, files)
      .then(async (res) => {
        return await feedDateCreateApi(res.data.id, dateinputs);
      })
      .then(async (res) => {
        window.alert("게시물 생성에 성공!");
        history.push(`/apply/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {bpList && <PSelectBProfile bpList={bpList} />}
      <PSchoolSelect />
      <PDateSelect />
      <PTimeSelect />
    </>
  );
}
