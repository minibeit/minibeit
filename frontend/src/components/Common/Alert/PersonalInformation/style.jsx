import styled from "styled-components";


export const AlertBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 40rem;
  height: 40rem;
  border-radius: 35px;
`;

export const AlertContent = styled.div`
  transform: translate(-50%, -20%);
  position: absolute;
  top: 20%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: left;

  & > div:first-child { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 35rem;
  }

  & > div > p:first-child {
    font-size: 30px;
    text-align: left;
    font-weight: 700;
  }

  & > div > div:nth-child(2) {
    font-size: 5rem;
  }

  & > p:nth-child(2) {
    font-size: 15px;
    text-align: left;
    line-height: 25px;
    width: 35rem;
  }

  & > div:nth-child(3) {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    background-color: #F9F9F9;
    border-radius: 17px;
    font-size: 15px;
    line-height: 20px;
    width: 35rem;
    height: 19rem;

  }
  & > div:nth-child(3) > p:first-child {
    margin: 15px;
    font-size: 13px;
    text-align: left;
    line-height: 16px;
    width: 33rem;
    height: 18rem;
    overflow-y: scroll;
    overflow-x: auto;
    font-weight: 400;
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: gray;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
}
  }

`;
