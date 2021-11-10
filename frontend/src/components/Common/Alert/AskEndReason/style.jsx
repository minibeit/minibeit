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
  width: 30rem;
  height: 20rem;
  border-radius: 35px;
  & > div:first-child{
    display: flex;
    justify-content: flex-end;
    font-size: 1.5rem;
    margin: 1.5rem;
    cursor: pointer;
  }
`;

export const BlueButton = styled.button`
  position: relative;
  width: 9rem;
  height: 2.7rem;
  font-size: 13px;
  line-height: 2.5rem;
  border-radius: 30px;
  color: #FFFFFF;
  border: 1px solid #0642FF;
  background: #0642FF;
`;


export const AlertContent = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  & > p:nth-child(2){
    width: 25rem;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
  }

  & > div:nth-child(2) {
    width: 25rem;
  }
  & > div > div:nth-child(2) {
    position: absolute;
    z-index:3;
    background: #fff;
    border-radius: 10px;
    }
`;

export const Select = styled.div`
  position: relative;
  width: 20rem;
  height: 1.2rem;
  padding: 6px 0;
	font-size: 11px;
	line-height: 1.2rem;
	border: 1px solid #0642FF;
  border-bottom: ${({isActive}) =>{return isActive ? 'none' : '1px solid #0642FF'}};
	border-radius: ${({isActive}) =>{return isActive ? '10px 10px 0 0' : '10px'}};
  text-align: center;
  color: #0642FF;
  cursor: pointer;
  & > span:first-child {
    position: absolute;
    right: 10px;
    ${({isActive})=>{return isActive ? 'transform: rotate(180deg)' : null}}
  }

`;

export const Option = styled.option`
  width: 20rem;
  height: 1.2rem;
  padding: 6px 0;
	font-size: 10px;
	line-height: 1.1rem;
	border: 1px solid gray;
  text-align: center;
  color: #8C8C8C;
  cursor: pointer;
  &:hover {
    color: #0642FF;
  }
  &:not(:last-child) {
    border-bottom: none;

  }
  &:not(:first-child) {
    border-top: none;
  }
  &:last-child{
    border-radius: 0 0 10px 10px;
    color: lightgray;
  }
  &:not(:last-child):after {
    content:'';
    position: relative;
    display: block;
    border-bottom: 1px solid rgba(140, 140, 140, 0.3);
    left: 50%;
    transform: translateX(-50%);
    width: 17rem;
    text-align: center;
    padding-bottom: 6px;
  }
`;

export const Input = styled.input`
	width: 20rem;
  height: 2rem;
  padding: 6px 0;
	font-size: 11px;
	line-height: 11px;
	border: 1px solid #0642FF;
	border-radius: 10px;
  text-align: center;
  color: #0642FF;
  box-sizing: border-box;
  :focus {
    border: 1px solid gray;
    color: gray;
  }
  `;
