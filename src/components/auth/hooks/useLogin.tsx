import { loginSchema, type LoginFormData } from "@/schema/authSchema";
import { loginApi } from "@/services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useLogin = () => {
  // Access the client
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // API Inegration can be added here
  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success("Login successful!");
      // Invalidate and refetch queries to update the state
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      // Handle successful login, e.g., redirect or show a success message
      console.log("Login successful:", data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      // Handle error, e.g., show an error message
      console.error("Login error:", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
  };
};

export default useLogin;
