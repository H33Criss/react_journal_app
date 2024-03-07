import { CircularProgress, IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store/thunks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.all";
import { useAppDispatch, useAppSelector } from "../../store";

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active, messageSaved } = useAppSelector(
    (state) => state.journal
  );

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={() => onClickNewNote()}
        size="large"
        sx={{
          backgroundColor: "secondary.main",
          position: "fixed",
          right: 30,
          bottom: 30,
          color: "white",
          "&:hover": {
            backgroundColor: "secondary.main",
            boxShadow: "1px 2px 10px .1px purple",
          },
          ":disabled": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        {!isSaving && <AddOutlined sx={{ fontSize: 30 }} />}
        {isSaving && <CircularProgress size="2rem" sx={{ color: "white" }} />}
      </IconButton>
    </JournalLayout>
  );
};
