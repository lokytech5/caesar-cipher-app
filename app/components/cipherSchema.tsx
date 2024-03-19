import { z } from "zod"

export const cipherSchema = z.object({
    text: z.string().min(1, { message: "Text is required" }),
    shift_amount: z.number().min(1, { message: "Shift amount must be at least 1" }),
    direction: z.enum(['encode', 'decode']),
    }).superRefine((data, ctx) => {
    if (!['encode', 'decode'].includes(data.direction)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Direction is invalid",
            path: ["direction"],
        });
    }
});