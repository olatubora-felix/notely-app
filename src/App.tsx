import NoteApp from "./components/note-app";
import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <main className="min-h-screen bg-black dark:from-slate-900 dark:to-slate-800">
      <NoteApp />
      <Toaster />
    </main>
  );
}
