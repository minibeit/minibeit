import React, { useState } from "react";
import TestModal from "../../components/Common/Modal/TestModal";
import NavBar from "../../components/Common/NavBar";

export default function Main() {
  const [modalSwitch, setModalSwitch] = useState(false);

  const onClick = () => {
    setModalSwitch(true);
  };

  return (
    <>
      <NavBar />
      <div>main</div>
      <button onClick={onClick}>test</button>
      {modalSwitch ? <TestModal setModalSwitch={setModalSwitch} /> : null}
    </>
  );
}
