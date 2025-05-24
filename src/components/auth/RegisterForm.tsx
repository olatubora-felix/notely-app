import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useRegister from "./hooks/useRegister";
import type { LoginFormData } from "@/schema/authSchema";
import { inputLists } from "@/constant/auth";

const RegisterForm = () => {
  const { handleSubmit, register, onSubmit, errors, isPending } = useRegister();
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
      <Button disabled={isPending} className="w-full">
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
