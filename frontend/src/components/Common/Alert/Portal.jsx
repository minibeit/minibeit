import { useEffect } from "react";
import ReactDom from "react-dom";
import * as S from "./style";

export default function Portal({ children }) {
  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow: hidden");
    return () => {
      document.querySelector("body").setAttribute("style", "");
    };
  }, []);
  if (children === undefined) return null;
  return ReactDom.createPortal(
    <S.Background>{children}</S.Background>,
    document.getElementById("modal")
  );
}
