import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { startLogout } from "../../store/thunks";
import { svgIconSombred } from "../../theme/purpleTheme";
import { useAppDispatch } from "../../store";

interface Props {
  drawerWidth?: number;
  toggleDrawer: (value: boolean) => void;
}

export const NavBar = ({ drawerWidth = 240, toggleDrawer }: Props) => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          aria-haspopup={false}
          aria-busy={false}
          onClick={() => toggleDrawer(true)}
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {" "}
            JournalApp{" "}
          </Typography>

          <IconButton onClick={onLogout}>
            <LogoutOutlined sx={svgIconSombred} />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
