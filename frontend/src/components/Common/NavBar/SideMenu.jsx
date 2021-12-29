import React from "react";
import Drawer from "@mui/material/Drawer";

export default function SideMenu({ setMenuSwitch }) {
  return (
    <Drawer
      anchor={"right"}
      open={() => setMenuSwitch(true)}
      onClose={() => setMenuSwitch(false)}
    >
      <div>
        dafafasdfasfadafafasdfasfadafafasdfasfadafafasdfasfadafafasdfasfa
      </div>
    </Drawer>
  );
}
