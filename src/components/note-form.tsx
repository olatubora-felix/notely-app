"use client";

import type React from "react";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNoteApi } from "@/services/notesApi";
import { toast } from "react-hot-toast";
import ModalContext from "@/context/modalContext";

export default function NoteForm() {
  const { onClose } = use(ModalContext);
  // Access the client
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("default");
  const [isPublic, setIsPublic] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: addNoteApi,
    onSuccess: (data) => {
      if (data) {
        toast.success("Note created successfully");
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        onClose();
      }
    },
    onError: (error) => {
      toast.error(`Error creating note: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    const noteData = {
      title,
      content,
      color,
      isPublic,
    };
    mutate(noteData);
    // Reset form fields
    setTitle("");
    setContent("");
    setColor("default");
    setIsPublic(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="mt-1"
            required
            autoFocus
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="mt-1 min-h-[150px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="color" className="mt-1">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-start md:justify-end h-full">
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
              <Label htmlFor="public">Make note public</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isPending ? "Creating..." : "Create Note"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
