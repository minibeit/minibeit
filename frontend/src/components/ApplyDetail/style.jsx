import styled from "styled-components";

export const FeedContainer = styled.div`
  justify-content: center;
  max-width: 55rem;
  margin: auto;
  margin-top: 3rem;
`;
export const TitleBox = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
`;
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > p:first-child {
    font-size: 20px;
    font-weight: 600;
    color: #8c8c8c;
  }
  & > p:nth-child(2) {
    font-weight: 600;
    font-size: 35px;
  }
  & > div:nth-child(3) {
    display: flex;
    gap: 2px;
  }
  & > div:nth-child(3) > p {
    font-size: 20px;
  }
`;
export const TitleBookMark = styled.div`
  margin-left: auto;
`;

export const FeedInfoBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const DataBox = styled.div`
  margin-bottom: 5rem;
`;
export const DataHeader = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
  padding: 0 0 10px 10px;
  & > p {
    font-size: 25px;
    font-weight: 800;
  }
  & > button {
    margin-left: 30px;
  }
`;
export const DataBody = styled.div`
  margin: 10px;
  & > p {
    margin: 1rem;
  }
`;

export const TimeSelectBox = styled.div`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 20px;
  width: 25rem;
`;
export const DateView = styled.div`
  text-align: center;
  height: 3rem;
  & > div {
    position: relative;
    top: 25%;
  }
`;
export const TimeView = styled.div`
  background-color: lightgray;
  text-align: center;
  min-height: 10rem;
  border-radius: 0 0 20px 20px;
  & > button {
    margin: 0.5rem;
  }
`;
export const DetailContent = styled.div`
  & > p {
    white-space: pre-wrap;
  }
`;
export const EditTextArea = styled.textarea`
  width: 100%;
  height: 13rem;
`;
export const Condition = styled.p`
  display: list-item;
`;
export const BusinessInfoBox = styled.div`
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  display: flex;
  gap: 10px;
  & > h3 {
    margin: 10px;
  }
`;
export const BussinessImgBox = styled.div`
  margin: 10px;
  background-color: gray;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  min-width: 10rem;
  min-height: 10rem;
  display: inline-block;
`;

export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

/* review */
export const ReviewBox = styled.div``;

/* apply remote controller */
export const ApplyRemote = styled.div`
  left: 81%;
  top: 36%;
  display: flex;
  width: 15rem;
  position: fixed;
  height: 21rem;
  border-radius: 10px;
  border: 1px solid grey;
  flex-direction: column;
  & > p:first-child {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
  }
  & > div:nth-child(3) {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }
  & > div:nth-child(3) > button {
    height: 36px;
    margin: 5px;
  }
`;
export const ApplyData = styled.div`
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  & > p {
    font-size: 16px;
    padding: 10px;
    border: 1px solid grey;
    margin: 5px;
  }
`;
