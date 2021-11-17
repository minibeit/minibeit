import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 57%;
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
  background-color: white;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
`;
export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  & > svg:first-child {
    font-size: 4rem;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  

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
