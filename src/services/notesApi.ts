import { supabase } from "@/lib/suspabse";

const addNoteApi = async (values: NoteFormData) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([values])
    .select();
  if (error && !data) throw new Error(error.message);
  return data;
};

export interface NoteFormData {
  title: string;
  content: string;
  color: string;
  isPublic: boolean;
}

// Get All Notes
const fetchNotesApi = async () => {
  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !notes) {
    throw new Error(error.message);
  }
  return notes;
};

// Delete Note
const deleteNoteApi = async (id: string) => {
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return true;
};

export { addNoteApi, fetchNotesApi, deleteNoteApi };
