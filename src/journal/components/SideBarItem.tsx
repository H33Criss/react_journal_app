import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { startSetActiveNote } from "../../store/thunks/journalThunk";
import { useAppDispatch } from "../../store";

interface Props {
  title?: string;
  body: string;
  id: string;
  date: number;
  imgURLS?: string[];
}

export const SideBarItem = ({
  title = "",
  body,
  id,
  date,
  imgURLS = [],
}: Props) => {
  const dispatch = useAppDispatch();

  const newTitle = useMemo(() => {
    return title.length >= 17 ? title.substring(0, 16) + "..." : title;
  }, [title]);
  const newBody = useMemo(() => {
    return body.length >= 46 ? body.substring(0, 45) + "..." : body;
  }, [body]);
  return (
    <ListItem
      disablePadding
      onClick={() =>
        dispatch(startSetActiveNote({ title, body, id, date, imgURLS }))
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot sx={{ color: "white" }} />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
