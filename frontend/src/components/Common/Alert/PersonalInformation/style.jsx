import styled from "styled-components";

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 30rem;
  border-radius: 20px;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 19rem;
    height: 21rem;
  }
`;

export const AlertContent = styled.div`
  transform: translate(-50%, -20%);
  position: absolute;
  top: 20%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: left;

  & > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 25rem;
  }

  & > div > p:first-child {
    font-size: 20px;
    text-align: left;
    font-weight: 700;
  }

  & > div > div:nth-child(2) {
    font-size: 1.5rem;
    padding: 1rem 0;
    cursor: pointer;
  }

  & > p:nth-child(2) {
    font-size: 10px;
    text-align: left;
    line-height: 17px;
    width: 25rem;
  }

  & > div:nth-child(3) {
    position: relative;
    background-color: #f9f9f9;
    border-radius: 17px;
    font-size: 15px;
    line-height: 15px;
    width: 25rem;
    height: 17rem;
  }
  & > div:nth-child(3) > p:first-child {
    margin: 15px;
    font-size: 10px;
    text-align: left;
    line-height: 13px;
    width: 23rem;
    height: 16rem;
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

  @media only screen and (max-width: 700px) {
    align-items: center;
    width: 19rem;
    height: 20rem;
    padding: 0 1rem;
    & > div:first-child {
      margin: 1rem 1rem 0 1rem;
      width: 19rem;
    }
    & > p:nth-child(2) {
      width: 18rem;
    }

    & > div:nth-child(3) {
      position: relative;
      width: 18rem;
      height: 10rem;
    }
    & > div:nth-child(3) > p:first-child {
      width: 17rem;
      height: 9.5rem;
    }
  }
`;
