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
        setBUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>{buserData ? <PBProfile buserData={buserData} /> : <LoadingSpinner />}</>
  );
}
