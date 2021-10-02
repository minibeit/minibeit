import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LoadingSpinner } from "../../Common";
import { getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfile from "./PBProfile";

BProfileInfo.propTypes = {
  businessId: PropTypes.number.isRequired,
};

export default function BProfileInfo({ businessId }) {
  const [buserData, setBUserData] = useState();
  useEffect(() => {
    getBprofileInfo(businessId)
      .then((res) => {
        console.log(res);
        setBUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [businessId]);
  console.log(buserData);
  return (
    <>{buserData ? <PBProfile buserData={buserData} /> : <LoadingSpinner />}</>
  );
}
