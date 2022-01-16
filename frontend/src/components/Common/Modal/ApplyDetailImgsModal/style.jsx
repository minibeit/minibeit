import styled from "styled-components";

// slider
export const Container = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 60rem;
  overflow: hidden;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    padding: 2em;
  }
`;
export const Button = styled.div`
  background: white;
  border: 1px solid #c4c4c4;
  border-radius: 2em;
  padding: 0.5em 2em;
  min-width: 4em;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;

export const SliderImg = styled.div`
  width: 100%;
  height: 30em;
  background: ${({ img }) => img && `url(${img})`} no-repeat center
    center/contain;
`;
