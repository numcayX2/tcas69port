"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppStore } from "@/store/useAppStore";

type FormValues = {
  name: string;
  email: string;
};

export default function FormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const count = useAppStore((s) => s.count);
  const increment = useAppStore((s) => s.increment);
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const onSubmit = (data: FormValues) => {
    setSubmitted(data);
    increment();
  };

  return (
    <div className="w-full max-w-md rounded-lg border p-4 space-y-3">
      <h2 className="text-lg font-semibold">React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Name</label>
          <input
            className="border rounded px-2 py-1"
            placeholder="Ada Lovelace"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Min 2 characters" },
            })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Email</label>
          <input
            className="border rounded px-2 py-1"
            placeholder="ada@example.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-foreground text-background rounded px-3 py-2 text-sm"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="text-sm text-gray-600">
        Store count: <span className="font-semibold">{count}</span>
      </div>
      {submitted && (
        <div className="text-sm">
          Submitted: <span className="font-mono">{submitted.name}</span> •
          {" "}
          <span className="font-mono">{submitted.email}</span>
        </div>
      )}
    </div>
  );
}

