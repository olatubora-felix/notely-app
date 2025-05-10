import { deleteNoteApi } from "@/services/notesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteNote = () => {
  // Access the client
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        toast.success("Note deleted successfully");
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }
    },
  });
  return {
    mutate,
    isPending,
  };
};

export default useDeleteNote;
