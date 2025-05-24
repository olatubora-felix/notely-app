import { getCurrentUserApi } from "@/services/authApi";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, status, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  return {
    currentUser: data as User | null,
    status,
    error,
  };
};

export default useCurrentUser;
export interface User {
  id: string;
  created_at: string;
  name: string;
  email: string;
}
