import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
0% {
  transform : translate(-50%, -45%);
  opacity: 0;

}
100%{
  transform : translateY(-50%, -50%);
  opacity: 1;

}`;

const fadeIn = keyframes`
0% {
  opacity: 0;

}
100%{
  opacity: 1;

}`;

export const Background = styled.div`
  animation: ${fadeIn} 0.5s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  & > div {
    animation: ${slideUp} 1s ease-in;
  }
`;
