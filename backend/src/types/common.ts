/** Shared primitives used across domain modules (SPEC §6). */

export interface Address {
  id?: string;
  type?: "shipping" | "billing";
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: "IN";
  isDefault?: boolean;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
