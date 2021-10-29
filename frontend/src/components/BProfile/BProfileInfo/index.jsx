import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LoadingSpinner } from "../../Common";
import { getBprofileInfo } from "../../../utils/bprofileApi";
import Presenter from "./presenter";

BProfileInfo.propTypes = {
  businessId: PropTypes.number.isRequired,
};

export default function BProfileInfo({ businessId }) {
  const [buserData, setBUserData] = useState();
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modal2Switch, setModal2Switch] = useState(false);
  useEffect(() => {
    getBprofileInfo(businessId)
      .then((res) => {
        setBUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [businessId]);
  return (
    <>
      {buserData ? (
        <Presenter
          buserData={buserData}
          setModal2Switch={setModal2Switch}
          setModalSwitch={setModalSwitch}
          modalSwitch={modalSwitch}
          modal2Switch={modal2Switch}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
