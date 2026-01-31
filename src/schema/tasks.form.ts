import { z } from "zod";

export const AddTaskFormSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    body: z.string().min(1, "Description is required").trim(),
});

export type TAddTaskFormSchema = z.infer<typeof AddTaskFormSchema>;
