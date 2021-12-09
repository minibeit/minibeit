import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }) {
  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow: hidden");
    return () => {
      document.querySelector("body").setAttribute("style", "");
    };
  }, []);
  return createPortal(children, document.getElementById("modal"));
}
