"use client";

import { motion, AnimatePresence } from "framer-motion";
import NoteCard from "./note-card";
import { useToast } from "@/hooks/use-toast";
import { AddNoteModal } from "./AddNoteModal";
import useGetNotes from "@/hooks/useGetNotes";
import AuthModal from "./auth/AuthModal";
import useCurrentUser from "./auth/hooks/useCurrentUser";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import useLogout from "./auth/hooks/useLogout";

export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  isPublic: boolean;
  created_at: Date;
  updated_at: Date;
};

export default function NoteApp() {
  const { currentUser, status: currentUserStatus } = useCurrentUser();
  const { logoutPending, handleLogout } = useLogout();
  console.log(currentUser);
  const { notes, status } = useGetNotes();
  console.log(notes);
  const { toast } = useToast();

  // const handleTogglePublic = (id: string) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === id
  //         ? { ...note, isPublic: !note.isPublic, updatedAt: new Date() }
  //         : note
  //     )
  //   );

  //   const note = notes?.find((note) => note.id === id);
  //   toast({
  //     title: note?.isPublic ? "Note made private" : "Note shared publicly",
  //     description: note?.isPublic
  //       ? "Your note is now private."
  //       : "Your note can now be shared with others.",
  //   });
  // };

  const handleShareNote = (id: string) => {
    const note = notes?.find((note) => note.id === id);
    if (note && note.isPublic) {
      // In a real app, this would generate a shareable link
      navigator.clipboard.writeText(`https://notes-app.com/share/${id}`);
      toast({
        title: "Share link copied!",
        description: "The link to your note has been copied to clipboard.",
      });
    } else {
      toast({
        title: "Cannot share private note",
        description: "Make your note public first to share it.",
        variant: "destructive",
      });
    }
  };
  console.log(currentUserStatus);
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-slate-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Notely
          </span>
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-300">
          Create, manage, and share your notes with ease
        </p>
      </header>
      <div className="flex justify-center mb-8">
        {currentUserStatus === "pending" && !currentUser && (
          <Skeleton className="w-32 h-8 bg-gray-300" />
        )}
        {currentUserStatus !== "success" &&
          currentUserStatus !== "pending" &&
          !currentUser && <AuthModal />}
        {currentUser && <AddNoteModal />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {notes?.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <NoteCard
                note={note}
                // onEdit={handleEditNote}
                // onDelete={handleDeleteNote}
                // onTogglePublic={handleTogglePublic}
                onShare={handleShareNote}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {notes?.length === 0 && status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="text-slate-400 dark:text-slate-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200">
              No notes yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Create your first note to get started
            </p>
          </motion.div>
        )}
      </div>
      {currentUser && (
        <div className="flex justify-end mt-8">
          <Button
            variant={"outline"}
            disabled={logoutPending}
            onClick={handleLogout}
          >
            {" "}
            <LogOut />
            {logoutPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      )}
    </div>
  );
}
