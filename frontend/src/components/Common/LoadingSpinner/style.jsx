import styled, { keyframes } from "styled-components";

const spinCircle = keyframes`
  from {
      transform: rotate(0);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const ImgBox = styled.div`
  width: 8.5rem;
  height: 8.5rem;
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  & > img {
    width: inherit;
  }
  animation: ${spinCircle} 3s linear infinite;
  transform: translateZ(0);
`;
