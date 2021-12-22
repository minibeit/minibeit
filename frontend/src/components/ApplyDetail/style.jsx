import styled, { css, keyframes } from "styled-components";

const fadeOut = keyframes`
0% {
 opacity:1;
transform:translateY(0);
}
50% {
  opacity:0.6;
  transform:translateY(0.5rem);

}
100%{
 opacity:1;
 transform:translateY(0);

}
`;
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    padding: 3rem 5rem;
  }
`;

export const UnderTitle = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 3em 0;
`;
/* Title */
export const TitleBox = styled.div`
  position: relative;
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #c4c4c4;
`;
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  & > p:first-child {
    background: #0642ff2e;
    width: fit-content;
    padding: 0.4em 0.7em;
    border-radius: 1em;
    color: #003dff;
    font-weight: bold;
    white-space: nowrap;
  }
  & > div:nth-child(2) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    & > p:first-child {
      font-size: 2rem;
      font-weight: 700;
    }
    & > div:nth-child(2) {
      display: flex;
      gap: 1rem;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    color: #8c8c8c;
    font-weight: bold;
    gap: 0.3rem;
    & > svg {
      width: 1rem;
      height: 1rem;
      & path {
        fill: #8c8c8c;
      }
    }
  }
`;
export const CopyTemplateBtn = styled.button`
  color: #0642ff;
  background-color: #fff;
  border: 1px solid #0642ff;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export const TitleBookMark = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  cursor: pointer;
  color: ${({ isLike }) => {
    return isLike ? "#0642ff" : "#8c8c8c";
  }};
  & > svg {
    width: 1.2rem;
    height: 1.2rem;
    path {
      fill: ${({ isLike }) => {
        return isLike ? "#0642ff" : "#8c8c8c";
      }};
    }
  }
  & > p:last-child {
    font-size: 0.8rem;
  }
`;
/* Content */
export const ContentBox = styled.div`
  flex: 3;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const DataHeader = styled.div`
  border-bottom: #11111129 solid 1px;
  padding: 0 0 1.2rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
export const DataContent = styled.div`
  padding: 1rem 0;
`;
export const ListBox = styled.ul`
  display: flex;
  margin: 0.5em 0;
  li {
    display: flex;
    & > div:first-child {
      min-width: 4em;
      font-weight: bold;
    }
    :before {
      content: "ㆍ";
    }
  }
`;

export const RecruitLabel = styled.p`
  width: fit-content;
  padding: 0.3em 0.7em;
  font-weight: bold;
  color: #7c7c7c;
  border-radius: 0.3em;
  ${({ condition }) =>
    condition
      ? css`
          background: #e5ecff;
        `
      : css`
          background: #f2f2f2;
        `}
`;

export const PaymentLabel = styled.p`
  margin-right: 0.5em;
  font-weight: bold;
  color: ${({ payment }) => (payment === "CACHE" ? "#00BB34" : "#3558C7")};
`;

export const AddressText = styled.div`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

export const EditBtn = styled.button`
  background-color: #0642ff;
  border: 1px solid #0642ff;
  color: #fff;
  border-radius: 2em;
  white-space: nowrap;
  padding: 0.6em 2em;
  cursor: pointer;
  :hover {
    color: #0642ff;
    background-color: #fff;
    border: 1px solid #0642ff;
  }
`;
/* date & time */
export const TimeSelectBox = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 1.25rem;
  min-height: 19rem;
  display: flex;
  flex-direction: column;
`;
export const Navigation = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    justify-content: center;
    transform: translate(2rem, 0);
    & > p {
      font-weight: bold;
      white-space: nowrap;
    }
    & > svg {
      width: 1rem;
      cursor: pointer;
    }
  }
`;
export const TimeView = styled.div`
  flex: 2.5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  border-radius: 0 0 20px 20px;
  padding: 2rem;
`;

export const TimeBtn = styled.div`
  & > input {
    display: none;
  }
  & > label {
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    border-radius: 0.7rem;
    background: white;
    color: black;
    border: 3px solid white;
  }
  & > input:checked + label {
    border: 3px solid #0642ff;
  }
  & > input:hover + label {
    color: #0642ff;
  }
  & > input:disabled + label {
    color: grey;
    cursor: default;
  }
`;

export const DetailContent = styled.div`
  white-space: pre-line;
  line-height: 1.3rem;
  font-size: 1rem;
`;
export const EditTextArea = styled.textarea`
  width: 80%;
  height: 20em;
`;

export const Img = styled.img`
  width: 100%;
`;

/* review */
export const ReviewItem = styled.div`
  display: flex;
  margin: 1em 0.5em;
  gap: 0.5em;
  & > div:nth-child(3) {
  }
`;
export const ReviewTitle = styled.div`
  display: flex;
  gap: 0.5em;
  & > p {
    font-weight: bold;
    color: #404040;
  }
`;
export const ReviewCount = styled.div`
  display: flex;
  gap: 0.5em;
  & svg {
    width: 1rem;
    & path {
      fill: #0642ff;
    }
  }
  & > p {
    font-weight: bold;
  }
  margin-left: auto;
`;

/* apply remote controller */
export const RemoteBox = styled.div``;

export const Controller = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  position: sticky;
  height: 19rem;
  margin-top: 3.3rem;
  top: 4rem;
  border: 1px solid #c4c4c4;
  border-radius: 1.25rem;
  & > p:first-child {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }
  & > div:nth-child(3) {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem;
    & > div > span {
      margin-right: 0.4rem;
      font-weight: 600;
    }
  }
`;
export const ApplyData = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 7px;
  & > div {
    padding: 0.7rem;
    font-size: 0.8rem;
    font-weight: 200;
    & > span {
      font-weight: bold;
      margin: 0 0.7rem;
    }
  }
  & > div:first-child {
    border-bottom: 1px solid #c4c4c4;
  }
`;
export const ApplyBtnGroup = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > button {
    font-size: 1rem;
    padding: 7px;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  & > button:first-child {
    background: #0642ff;
    color: white;
    &:disabled {
      background: #c4c4c4;
    }
  }
  & > button:nth-child(2) {
    background: #f1f1f1;
    color: #c4c4c4;
    :hover {
      background: #0642ff;
      color: #fff;
    }
  }
`;

// apply detail imgs slider
export const ApplyImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 27.5rem;
  margin: 4rem 0;

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const BigImg = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 0.4rem;
  object-fit: contain;
  background-color: #000;
  cursor: pointer;
`;

export const SmImg = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.2rem;
  object-fit: contain;
  flex-grow: 1;
  /* border: 1px solid gray;
  box-sizing: border-box; */
  background-color: #c0bfbf;
  cursor: pointer;
`;
export const NoImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.2rem;
  object-fit: contain;
  flex-grow: 1;
  background-color: #c0bfbf;
`;
export const Div = styled.div`
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  background-color: rgba(80, 80, 80, 0.6);
  border-radius: 0.2rem;
  font-size: 2rem;
  line-height: 6.25rem;
  color: #ffffff;
  text-align: center;
  z-index: 2;
  cursor: pointer;
`;

export const ViewNum = styled.div`
  animation: ${fadeOut} 5s infinite;
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #e0e8ff;
  border-radius: 0.6rem;
  white-space: nowrap;
  & > span {
    font-weight: 600;
  }
`;
