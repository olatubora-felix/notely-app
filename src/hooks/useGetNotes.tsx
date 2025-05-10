import { fetchNotesApi } from "@/services/notesApi";
import { useQuery } from "@tanstack/react-query";

const useGetNotes = () => {
  const { data, status } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotesApi,
  });
  return {
    notes: data,
    status,
  };
};

export default useGetNotes;
