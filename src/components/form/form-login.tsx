"use client";

import { ILoginFormValues, loginSchema } from "@/features/auth/auth.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Lock, Mail, Send } from "lucide-react";
import { Button } from "../ui/button";
import { useLogin } from "@/features/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth.store";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginMutattion = useLogin();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginFormValues) => {
    loginMutattion.mutate(data, {
      onSuccess: (response) => {
        setUser(response.user);
        toast.success(response.message);
        router.replace("/dashboard");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Terjadi kesalahan");
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Mail className="text-primary" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={field.name}
                type="email"
                placeholder="Email"
                aria-invalid={fieldState.invalid}
                autoComplete="username"
              />
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Lock className="text-primary" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
              />
              <InputGroupAddon
                align="inline-end"
                className="cursor-pointer"
                onClick={() => setShowPassword((val) => !val)}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        variant="secondary"
        type="submit"
        className="w-full cursor-pointer flex items-center justify-center font-semibold tracking-wide"
      >
        Login
        <Send />
      </Button>
    </form>
  );
};

export default FormLogin;
