import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

export default function Portal({ children }) {
  const onClick = ({ target }) => {
    if (document.querySelector("#modal > div") === target)
      console.log(children);
    children.props.children[0].props.children.props.onClick();
  };
  return createPortal(
    <ModalBackground onClick={onClick}>{children}</ModalBackground>,
    document.getElementById("modal")
  );
}
