import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import NoteForm from "./note-form";
import ModalContext from "@/context/modalContext";
import { use } from "react";

export function AddNoteModal() {
  const { setModal, modal } = use(ModalContext);
  return (
    <Dialog
      open={modal.isOpen && modal.type === "add-note"}
      onOpenChange={(open) => setModal({ isOpen: open, type: "add-note" })}
    >
      <DialogTrigger asChild>
        <Button className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all">
          <PlusCircle className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>
            This is a simple note-taking application. You can create, edit,
          </DialogDescription>
        </DialogHeader>
        <NoteForm />
      </DialogContent>
    </Dialog>
  );
}
