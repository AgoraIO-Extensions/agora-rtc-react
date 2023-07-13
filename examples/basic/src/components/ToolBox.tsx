import { Button, Drawer } from "antd";
import { type ReactNode, useState } from "react";

interface ToolBoxProps {
  children?: ReactNode;
}
export const ToolBox = ({ children }: ToolBoxProps) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    setOpen(false);
  };
  return (
    <>
      {children ? (
        children
      ) : (
        <>
          <button
            className="btn"
            onClick={showDrawer}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              marginTop: "-3rem",
              border: "1px solid #333333",
              borderRight: "none",
              borderRadius: "0.25rem 0 0 0.25rem",
              padding: "0.1rem 0.2rem",
              cursor: "pointer",
            }}
          >
            <i className="i-mdi-menu" style={{ fontSize: "2rem" }} />
          </button>
          <Drawer onClose={onClose} open={open} placement="right" title="Settings">
            <div className="flex flex-col">
              <Button onClick={confirm} type="primary">
                Confirm
              </Button>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};
