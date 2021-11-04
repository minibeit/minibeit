import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import { handleCompressImg } from "../../../../utils/imgCompress";
import { editBprofile, getBprofileInfo } from "../../../../utils/bprofileApi";
import { LoadingSpinner } from "../../../Common";

import Presenter from "./presenter";

export default function BProfileEditCont({ businessId, setModal2Switch }) {
  const [BProfileData, setBProfileData] = useState();
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const [basicImg, setBasicImg] = useState(false);
  const [newImg, setNewImg] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    contact: "",
  });

  const { name, place, contact } = inputs;

  const bpEditHandler = async (inputs, img, basicImg) => {
    editBprofile(businessId, inputs, img, basicImg)
      .then((res) => {
        window.location.replace("/business/" + businessId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProfile = useCallback(async () => {
    getBprofileInfo(businessId)
      .then((res) => {
        setBProfileData(res.data.data);
        return res;
      })
      .then((res) => {
        setInputs({
          name: res.data.data.name,
          place: res.data.data.place,
          contact: res.data.data.contact,
        });
      });
  }, [businessId]);
  const admin = useRecoilValue(userState).name;

  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    setBasicImg(false);
    handleCompressImg(e.target.files[0]).then((res) => setNewImg(res));
  };
  const imgDel = () => {
    setBasicImg(true);
    setNewImg(undefined);
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const closeModal = () => {
    setModal2Switch(false);
  };

  return (
    <>
      {BProfileData ? (
        <Presenter
          closeModal={closeModal}
          basicImg={basicImg}
          newImg={newImg}
          BProfileData={BProfileData}
          imgDel={imgDel}
          fileChange={fileChange}
          name={name}
          onChange={onChange}
          admin={admin}
          place={place}
          setadModalSwitch={setadModalSwitch}
          admodalSwitch={admodalSwitch}
          handleAddress={handleAddress}
          contact={contact}
          bpEditHandler={bpEditHandler}
          inputs={inputs}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
