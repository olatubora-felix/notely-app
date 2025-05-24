import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useLogin from "./hooks/useLogin";
import type { LoginFormData } from "@/schema/authSchema";

const LoginForm = () => {
  const { register, handleSubmit, errors, onSubmit, isPending } = useLogin();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {inputLists.map((input) => (
        <div key={input.id}>
          <Label htmlFor={input.id}>{input.label}</Label>
          <Input
            id={input.id}
            placeholder={input.placeholder}
            className=""
            type={input.type}
            required={input.required}
            autoFocus={input.required}
            {...register(input.id as keyof LoginFormData)}
          />
          {errors[input.id as keyof LoginFormData] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[input.id as keyof LoginFormData]?.message}
            </p>
          )}
        </div>
      ))}
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;

const inputLists = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];
