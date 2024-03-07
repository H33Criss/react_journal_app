import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from "../store/slices";

export const loadNotes = async ({ uid = "" }: { uid?: string }) => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: Note[] = [];

  docs.forEach((doc) => {
    notes.push({ ...(doc.data() as Note) });
  });
  return notes;
};
