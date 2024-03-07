import { Dispatch } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes, fileUpload } from "../../helpers";
import { RootState } from "../store";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setActiveImagesUrls,
  deleteNoteById,
  Note,
} from "../slices/journalSlice";

export const startNewNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(savingNewNote());

    const {
      user: { uid },
    } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imgURLS: [],
    } as {
      title: string;
      body: string;
      date: number;
      imgURLS: string[];
      id?: string;
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote as Note));
    dispatch(setActiveNote(newNote as Note));
  };
};

export const startSetActiveNote = (note: Note) => {
  return (dispatch: Dispatch) => {
    // console.log(note)
    dispatch(setActiveNote(note));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      user: { uid },
    } = getState().auth;
    const notes = await loadNotes({ uid });
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setSaving());
    const {
      user: { uid },
    } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note!.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(note!));
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: Dispatch) => {
    dispatch(setSaving());
    const filesPromisesUpload = [];
    for (const file of files) {
      filesPromisesUpload.push(fileUpload(file));
    }

    const imgsURL = await Promise.all(filesPromisesUpload);
    dispatch(setActiveImagesUrls(imgsURL));
  };
};

export const startDeleteNoteById = (noteID: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setSaving());
    const {
      user: { uid },
    } = getState().auth;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteID}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(noteID));
    console.log("borrado");
  };
};
