import styled, { keyframes } from "styled-components";

const moveIcon1 = keyframes`
0% {
  transform: scale( 1.0 );
}
50% {
  transform: scale( 1.2 );
}
100% {
  transform: scale( 1.0 );
}
`;
const moveIcon2 = keyframes`
 0% {
  transform: translate(0,0);
}
50% {
  transform: translateY(-1rem);
}
100% {
  transform: translate(0,0);
}
`;

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;

  & > div:first-child {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    & > div:first-child {
      top: 15rem;
      left: -1rem;
      animation: ${moveIcon2} 4s ease-in infinite;
    }
    & > div:last-child {
      top: 8rem;
      left: 3rem;
      animation: ${moveIcon1} 8s ease-in infinite;
    }
  }
`;

export const Txt = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
  line-height: 1.5rem;
  /* color: #6b6b6b; */
  animation: ${moveIcon2} 8s ease-in infinite;
`;

export const ImgBox = styled.div`
  flex: 1;
  height: 4rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 4rem;
  }
`;

export const BoxForImgBox = styled.div`
  display: flex;
  position: absolute;
  height: 20rem;
  flex-direction: column;

  & > div:first-child {
    top: 7rem;
    left: 4rem;
    animation: ${moveIcon1} 4s ease-in infinite;
  }
  & > div:last-child {
    top: 17rem;
    left: 7rem;
    animation: ${moveIcon2} 4s ease-in infinite;
  }
`;

export const SImgBox = styled.div`
  flex: 1;
  height: 4rem;
  & > img {
    width: 4rem;
  }
`;
