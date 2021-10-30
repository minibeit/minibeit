import React, { useState } from "react";
import { handleCompressImg } from "../../../../utils/imgCompress";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";

import Presenter from "./presenter";

export default function BProfileCreateModal({
  setModalSwitch,
  CreateBProfile,
}) {
  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    introduce: "afewf",
    contact: "",
  });
  const [img, setImg] = useState();
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const admin = useRecoilValue(userState).name;
  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };
  const { name, place, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  const fileChange = (e) => {
    handleCompressImg(e.target.files[0]).then((res) => setImg(res));
  };
  const imgDel = () => {
    setImg(undefined);
  };
  return (
    <Presenter
      closeModal={closeModal}
      img={img}
      imgDel={imgDel}
      fileChange={fileChange}
      name={name}
      onChange={onChange}
      admin={admin}
      place={place}
      contact={contact}
      admodalSwitch={admodalSwitch}
      setadModalSwitch={setadModalSwitch}
      handleAddress={handleAddress}
      CreateBProfile={CreateBProfile}
      inputs={inputs}
    />
  );
}
