import { logoutApi } from "@/services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLogout = () => {
  // Access the client
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logoutApi, // Call the logout API
    onSuccess: () => {
      // Handle successful logout, e.g., redirect to login page or show a success message
      toast.success("Logout successful!");
      // Invalidate and refetch queries to update the state
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      window.location.href = "/"; // Redirect to login page
    },
    onError: (error: Error) => {
      // Handle error, e.g., show an error message
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    mutate(); // Trigger the logout mutation
  };
  return { handleLogout, logoutPending: isPending };
};

export default useLogout;
