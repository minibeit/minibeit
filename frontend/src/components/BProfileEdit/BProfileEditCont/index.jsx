import React, { useEffect, useState } from "react";
import { editBprofile, getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfileEditCont from "./PBProfileEditCont";
import { LoadingSpinner } from "../../Common";

export default function BProfileEditCont({ businessId }) {
  const [BProfileData, setBProfileData] = useState();
  const bpEditHandler = async (inputs, img, basicImg) => {
    editBprofile(businessId, inputs, img, basicImg)
      .then((res) => {
        window.location.replace("/business/" + businessId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProfile = async () => {
    getBprofileInfo(businessId).then((res) => setBProfileData(res.data));
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {BProfileData ? (
        <PBProfileEditCont
          bpEditHandler={bpEditHandler}
          BProfileData={BProfileData}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
