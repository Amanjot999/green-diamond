"use client";

import { useState } from "react";
import { addressSchema, type Address } from "@backend/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMPTY: Address = {
  fullName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** Step 1 — delivery address, validated with the shared Zod schema. */
export function AddressForm({
  initial,
  submitting,
  onSubmit,
}: {
  initial?: Address;
  submitting: boolean;
  onSubmit: (address: Address) => void;
}) {
  const [values, setValues] = useState<Address>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const set = (key: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = addressSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof Address, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Address;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  }

  const props = (key: keyof Address, autoComplete: string) => ({
    id: key,
    value: values[key] ?? "",
    onChange: set(key),
    autoComplete,
    "aria-invalid": errors[key] !== undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field id="fullName" label="Full name" error={errors.fullName} className="sm:col-span-2">
        <Input {...props("fullName", "name")} />
      </Field>
      <Field id="phone" label="Mobile number" error={errors.phone}>
        <Input {...props("phone", "tel")} inputMode="numeric" placeholder="10-digit mobile" />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <Input {...props("email", "email")} type="email" />
      </Field>
      <Field id="line1" label="Address line 1" error={errors.line1} className="sm:col-span-2">
        <Input {...props("line1", "address-line1")} placeholder="House / flat, street" />
      </Field>
      <Field id="line2" label="Address line 2 (optional)" error={errors.line2} className="sm:col-span-2">
        <Input {...props("line2", "address-line2")} placeholder="Landmark, area" />
      </Field>
      <Field id="city" label="City" error={errors.city}>
        <Input {...props("city", "address-level2")} />
      </Field>
      <Field id="state" label="State" error={errors.state}>
        <Input {...props("state", "address-level1")} />
      </Field>
      <Field id="pincode" label="PIN code" error={errors.pincode}>
        <Input {...props("pincode", "postal-code")} inputMode="numeric" placeholder="e.g. 395007" />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={submitting} className="h-12 w-full sm:w-auto sm:px-10">
          {submitting ? "Checking serviceability…" : "Continue to shipping"}
        </Button>
      </div>
    </form>
  );
}
