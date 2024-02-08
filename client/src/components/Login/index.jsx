import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogin } from "@/hooks";
import formSchema from "./formSchema";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast()

  const { login, isLoading, isError } = useLogin();

  const handleLogin = async (value) => {
    const userDetails = {
      userName: `${value.userName}@trs.com`,
      password: value.password,
    };

    await login(userDetails.userName, userDetails.password)

    isError ? toast({
      title: "Login Failed!",
      description: "Internal Server Error!"
    })
      : toast({
        title: "Login Successful!",
      })
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label
          htmlFor="userName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>

        <div className="mt-2">
          <Input
            type="text"
            placeholder="eg. softwarica"
            id="userName"
            {...register("userName")}
            className={cn(
              "block w-full py-1.5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6",
            )}
          />

          {errors.userName && (
            <p className="mt-1 text-sm text-error">{errors.userName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>

        <div className="mt-2">
          <Input
            type="password"
            id="password"
            {...register("password")}
            className={cn(
              "block w-full py-1.5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6",
            )}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="submit"
          className="flex w-full items-center gap-2 justify-center rounded-md bg-accent_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out"
        >
          Sign in

          {isLoading && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
        </button>

        {isError && (
          <p className="text-sm text-error">
            Username and password didn't match.
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
