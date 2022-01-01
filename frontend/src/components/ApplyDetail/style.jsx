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
  flex: 2;
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
  overflow: hidden;
  & > div:nth-child(2) {
    flex: 1;
  }
`;
export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3em;
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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.2rem;
  background: white;
  padding: 2em;
`;

export const TimeBtn = styled.div`
  flex: 1 0 25%;
  max-width: 24%;
  & > input {
    display: none;
  }
  & > label {
    padding: 1em 1.5em;
    justify-content: center;
    cursor: pointer;
    display: flex;
    background: #e5ecff;
    color: black;
  }
  & > input:checked + label {
    background: #0642ff;
    color: white;
  }
  & > input:hover + label {
    transform: scale(1.1);
  }
  & > input:disabled:hover + label {
    transform: scale(1);
  }
  & > input:disabled + label {
    background: #ebebeb;
    color: #c4c4c4;
    cursor: default;
  }
`;

export const DetailContent = styled.div`
  white-space: pre-line;
  line-height: 1.3rem;
  font-size: 1rem;
`;
export const EditTextArea = styled.textarea`
  width: 100%;
  height: 20em;
  border: 1px solid #c4c4c4;
  border-radius: 0.5rem;
  padding: 0.5em;
  box-sizing: border-box;
`;

export const Img = styled.img`
  width: 100%;
`;

/* review */
export const ReviewItem = styled.div`
  display: flex;
  margin: 1em 0.5em;
  gap: 0.5em;
  & > p:nth-child(2) {
    display: flex;
    align-items: center;
  }
`;
export const ReviewTitle = styled.div`
  display: flex;
  gap: 0.5em;
  & > p {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #404040;
  }
`;
export const ReviewIcon = styled.div`
  background: ${({ id }) => {
      if (id === 1) {
        return 'url("/images/시간아이콘.png")';
      } else if (id === 2) {
        return "url(/images/웃는얼굴아이콘.png)";
      } else if (id === 3) {
        return "url(/images/돈다발아이콘.png)";
      } else if (id === 4) {
        return "url(/images/하트아이콘.png)";
      }
    }}
    no-repeat center center/contain;
  width: 2.5em;
  height: 1.5em;
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
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  margin-left: auto;
`;

/* apply remote controller */
export const RemoteBox = styled.div`
  flex: 1;
`;

export const Controller = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  position: sticky;
  max-width: 15em;
  height: 19rem;
  top: 4rem;
  margin: 3.5em auto;
  border: 1px solid #c4c4c4;
  border-radius: 1.25rem;
  & > p:first-child {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }
  & > div:nth-child(3) {
    display: flex;
    & > div:first-child {
      font-weight: bold;
      min-width: 3em;
    }
  }
`;
export const ApplyData = styled.table`
  border: 0.5px solid #C4C4C4
  border-radius: 0.5em;
  & tr {
    border: 1px solid #c4c4c4;
    &>td:first-child{
      font-weight:bold;
    }
  }
  & td {
    padding: 0.5em;
  }
`;
export const ApplyBtnGroup = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const ControllerBtn = styled.button`
  font-size: 1rem;
  padding: 0.5em;
  border: none;
  border-radius: 1.5em;
  font-weight: 600;
  cursor: pointer;
`;
export const ApplyBtn = styled(ControllerBtn)`
  background: #0642ff;
  border: 2px solid #0642ff;
  color: white;
  :disabled {
    background: #00000070;
    border: 2px solid #00000070;
    cursor: default;
  }
`;
export const CopyBtn = styled(ControllerBtn)`
  background: white;
  border: 2px solid #0642ff;
  color: #0642ff;
`;

// apply detail imgs slider
export const SliderImg = styled.div`
  min-height: 20em;
  background: ${({ img }) => img && `url(${img})`} no-repeat center
    center/contain;
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
