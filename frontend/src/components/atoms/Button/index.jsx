import styled from "styled-components";

export default function Button({
  innerText,
  buttonColor,
  onClick,
  padding,
  textColor,
  fontSize,
}) {
  const Button = styled.button`
    width: fit-content;
    background: ${buttonColor};
    padding: ${padding ? padding : "0.5rem 1.5rem"};
    font-size: ${fontSize ? fontSize : "0.85rem"};
    color: ${textColor};
    font-weight: bold;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 2em;
    box-shadow: 0.2rem 0.2em 0.2rem rgb(189 189 189 / 40%);
    &:hover {
      background: ${textColor};
      color: ${buttonColor};
    }
  `;

  return <Button onClick={onClick}>{innerText}</Button>;
}
