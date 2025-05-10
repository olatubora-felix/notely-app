"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trash,
  Edit,
  Share2,
  MoreVertical,
  Globe,
  Lock,
  Copy,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Note } from "./note-app";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { DeleteNoteModal } from "./DeleteNoteModal";

interface NoteCardProps {
  note: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (id: string) => void;
  onTogglePublic?: (id: string) => void;
  onShare: (id: string) => void;
}

export default function NoteCard({
  note,

  onShare,
}: NoteCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getColorClass = () => {
    switch (note.color) {
      case "red":
        return "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50";
      case "green":
        return "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800/50";
      case "blue":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50";
      case "purple":
        return "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800/50";
      case "yellow":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800/50";
      default:
        return "bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700";
    }
  };

  return (
    <>
      <motion.div
        className={`rounded-lg border p-4 shadow-sm transition-all duration-300 ${getColorClass()} hover:shadow-md`}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-1">
            {note.title}
          </h3>
          <div className="flex items-center">
            <Badge
              variant={note.isPublic ? "default" : "outline"}
              className={`mr-2 ${
                note.isPublic ? "bg-green-500 hover:bg-green-600" : ""
              }`}
            >
              {note.isPublic ? (
                <Globe className="w-3 h-3 mr-1" />
              ) : (
                <Lock className="w-3 h-3 mr-1" />
              )}
              {note.isPublic ? "Public" : "Private"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {note.isPublic ? (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Make Public
                    </>
                  )}
                </DropdownMenuItem>
                {note.isPublic && (
                  <DropdownMenuItem onClick={() => onShare(note.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Share Link
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-wrap break-words text-sm">
          {note.content.length > 150
            ? `${note.content.substring(0, 150)}...`
            : note.content}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>
            Updated {formatDistanceToNow(note.updated_at, { addSuffix: true })}
          </span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex gap-1"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              // onClick={() => onEdit(note)}
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onShare(note.id)}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-500"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash className="h-3.5 w-3.5" />
              <span className="sr-only">Delete</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <DeleteNoteModal
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={(open) => setShowDeleteDialog(open)}
        noteId={note.id}
      />
    </>
  );
}
