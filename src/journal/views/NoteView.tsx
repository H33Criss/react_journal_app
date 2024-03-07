import {
  DeleteForeverOutlined,
  SaveOutlined,
  UploadSharp,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useForm } from "../../hooks/useForm";
import {
  startDeleteNoteById,
  startSaveNote,
  startSetActiveNote,
  startUploadingFiles,
} from "../../store/thunks";
import { ImageGallery } from "../components";
import { useAppDispatch, useAppSelector } from "../../store";

export const NoteView = () => {
  const dispatch = useAppDispatch();
  const { active: note, isSaving } = useAppSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note!);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("es-ES", options);
  }, [date]);

  useEffect(() => {
    dispatch(startSetActiveNote(formState));
  }, [formState]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onInputFileChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length === 0) return;
    dispatch(startUploadingFiles(target.files!));
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onInputFileChanged}
          style={{ display: "none" }}
        />
        <IconButton
          disabled={isSaving}
          sx={{ color: "black" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadSharp color="inherit" />
        </IconButton>
        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={() => onSaveNote()}
        >
          {!isSaving ? (
            <SaveOutlined sx={{ fontSize: 30, mr: 1, color: "primary.main" }} />
          ) : (
            <CircularProgress size="1rem" sx={{ color: "secondary.main" }} />
          )}
          Guardar
        </Button>
        <Button
          disabled={isSaving}
          onClick={() => dispatch(startDeleteNoteById(note!.id))}
        >
          {!isSaving ? (
            <DeleteForeverOutlined
              sx={{ fontSize: 30, mr: 1, color: "primary.main" }}
            />
          ) : (
            <CircularProgress size="1rem" sx={{ color: "secondary.main" }} />
          )}
          Borrar nota
        </Button>
      </Grid>

      <Grid container>
        <TextField
          name="title"
          value={title}
          onChange={onInputChange}
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          name="body"
          value={body}
          onChange={onInputChange}
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      {/* Image gallery */}
      <Grid item display="flex" justifyContent="center" xs={12}>
        <ImageGallery images={note?.imgURLS ?? []} />
      </Grid>
    </Grid>
  );
};
