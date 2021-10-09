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
export const TitleContent = styled.div``;
export const TitleBookMark = styled.div`
  margin-left: auto;
`;

export const FeedInfoBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const DataBox = styled.div`
  margin-bottom: 5rem;
  & > p {
    margin: 1rem;
`;
export const DataTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid grey;
  margin-bottom: 2rem;
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
  display: grid;
  border: 1px solid grey;
  width: 15rem;
  height: 17rem;
  border-radius: 1rem;
  position: fixed;
  left: 80%;
  z-index: 99;
  top: 30%;
  & > button {
    margin: auto;
    width: 80%;
    height: 2.5rem;
    border-radius: 3rem;
    font-weight: bold;
  }
  & > h3 {
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
export const ApplyData = styled.div`
  height: 50px;
  border: 1px solid grey;
  margin: 0.5rem;
  border-radius: 0.3rem;
  & > p {
    height: 50%;
  }
`;
