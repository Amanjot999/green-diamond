import { z } from "zod";

/**
 * Checkout schemas (SPEC §10: validate ALL inputs with Zod, shared
 * client + server). Used by the checkout UI for field errors and by the
 * server actions that call the shipping/payment seams.
 */

/** Valid Indian PINs are 6 digits and don't start with 0. */
export const pincodeSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code");

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the recipient's full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.email("Enter a valid email address"),
  line1: z.string().trim().min(4, "Enter the street address"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter the city"),
  state: z.string().trim().min(2, "Enter the state"),
  pincode: pincodeSchema,
});

export type Address = z.infer<typeof addressSchema>;

/** Positive integer paise amount (SPEC §10: money is integer minor units). */
export const paiseAmountSchema = z.number().int().min(0);
