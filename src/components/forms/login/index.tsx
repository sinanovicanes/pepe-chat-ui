"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { getCsrfToken, signIn } from "next-auth/react";

export const LoginForm = () => {
  const { handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const toggleVisibility = () => setPasswordVisibility(!isPasswordVisible);

  getCsrfToken().then(console.log);

  const onSubmit = async (fields: FieldValues) => {
    if (isLoading) return;
    setIsLoading(true);

    await signIn("credentials", {
      redirect: true,
      username: fields.username,
      password: fields.password,
      callbackUrl: `${window.location.origin}`
    });

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-1/3 min-h-screen flex-col gap-4"
      action=""
    >
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <Input
            maxLength={32}
            minLength={3}
            isRequired
            label="Username"
            isDisabled={isLoading}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            isRequired
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isPasswordVisible ? "text" : "password"}
            isDisabled={isLoading}
            {...field}
          />
        )}
      />
      <Button isLoading={isLoading} type="submit">
        Login
      </Button>
    </form>
  );
};
