import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../../Common";
import { getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfile from "./PBProfile";

export default function BProfileInfo({ businessId }) {
  const [buserData, setBUserData] = useState();
  useEffect(() => {
    getBprofileInfo(businessId)
      .then((res) => {
        setBUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {buserData ? (
        <PBProfile buserData={buserData} businessId={businessId} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
