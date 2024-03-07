import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardEvent, useState } from "react";
import { NavBar, SideBar } from "../components";

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 280;
export const JournalLayout = ({ children }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />

      <SideBar
        drawerWidth={drawerWidth}
        openDrawer={() => openDrawer}
        toggleDrawer={toggleDrawer}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
