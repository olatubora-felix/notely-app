import { registerSchema, type RegisterFormData } from "@/schema/authSchema";
import { signupApi } from "@/services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // API Inegration can be added here
  const { mutate, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success("Registration successful!");
      // Handle successful registration, e.g., redirect or show a success message
      console.log("Registration successful:", data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      // Handle error, e.g., show an error message
      console.error("Registration error:", error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
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

export default useRegister;
