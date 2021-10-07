import styled from "styled-components";

export const SchoolSearchBox = styled.div`
  width: 100%;
`;
export const SearchInput = styled.input`
  width: -webkit-fill-available;

  border: none;
  border-radius: 8px;
  padding: 4px 0 8px 5px;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.14px;
  text-align: left;
  margin-top: 7px;
  outline: none;
  color: #707070;
  text-decoration: none;
`;
export const SchoolList = styled.div`
  background: #b5b5b5;
  color: white;
  overflow-y: scroll;
  position: absolute;
  width: 54%;
  max-height: 10rem;
`;
export const SchoolItem = styled.div`
  padding: 8px 5px;
  border-bottom: 1px solid white;
`;
