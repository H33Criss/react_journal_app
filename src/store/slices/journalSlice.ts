import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imgURLS: string[];
}

interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote(state) {
      state.isSaving = true;
    },

    addNewEmptyNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
      state.isSaving = false;
      state.messageSaved = "";
    },

    setActiveNote(state, action: PayloadAction<Note>) {
      state.active = action.payload;
    },

    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },

    setSaving(state) {
      state.isSaving = true;
      state.messageSaved = "";
    },

    updateNote(state, action: PayloadAction<Note>) {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) return action.payload;
        return note;
      });
      state.messageSaved = `"${action.payload.title}", fue guardado correctamente.`;
    },

    setActiveImagesUrls(state, action: PayloadAction<string[]>) {
      if (state.active) {
        state.active.imgURLS = [...state.active.imgURLS, ...action.payload];
        state.isSaving = false;
      }
    },

    clearNotesLogout(state) {
      state.active = null;
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
    },

    deleteNoteById(state, action: PayloadAction<string>) {
      state.messageSaved = "Nota eliminada correctamente.";
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.isSaving = false;
    },
  },
});

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setActiveImagesUrls,
  setNotes,
  setSaving,
  updateNote,
  clearNotesLogout,
} = journalSlice.actions;

export default journalSlice.reducer;
