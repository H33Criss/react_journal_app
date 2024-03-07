import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { SideBarItem } from "./SideBarItem";
import { useAppSelector } from "../../store";

interface Props {
  drawerWidth?: number;
  openDrawer: () => boolean | undefined;
  toggleDrawer: (value: boolean) => void;
}
export const SideBar = ({
  drawerWidth = 240,
  openDrawer,
  toggleDrawer,
}: Props) => {
  const {
    user: { displayName },
  } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);

  const drawerContent = (
    <div onClick={() => toggleDrawer(false)}>
      <Toolbar>
        <Typography className="bg-gray-200" variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        {notes.map((note, i) => (
          <SideBarItem key={`${note.id}-${i}`} {...note} />
        ))}
        {notes.length === 0 && <ListItem>No tienes notas guardadas.</ListItem>}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="temporary" // temporary
        open={openDrawer()}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
