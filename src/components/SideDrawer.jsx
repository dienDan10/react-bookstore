import { Drawer } from "antd";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function SideDrawer({ position }) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AiOutlineMenu onClick={showDrawer} className="md:hidden" />
      <Drawer title="Menu" onClose={onClose} open={open} placement={position}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default SideDrawer;
