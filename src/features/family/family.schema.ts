import { z } from "zod";

export const familySchema = z.object({
  headFamily: z.string().min(3, "Minimal 3 karakter"),
  status: z.enum(["resident", "boarding"]),
  members: z
    .array(
      z.object({
        name: z.string().min(3, "Minimal 3 karakter"),
      })
    )
    .min(1, "Minimal 1 anggota keluarga"),
});

export type IFamilyFormValues = z.infer<typeof familySchema>;
