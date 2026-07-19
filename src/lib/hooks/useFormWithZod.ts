// src/lib/hooks/useFormWithZod.ts

import {
  useForm,
  type FieldValues,
  type UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useFormWithZod<Schema extends z.ZodType<FieldValues, FieldValues>>(
  schema: Schema,
  options?: UseFormProps<z.input<Schema>, unknown, z.output<Schema>>,
) {
  return useForm<z.input<Schema>, unknown, z.output<Schema>>({
    ...options,
    resolver: zodResolver(schema),
  });
}