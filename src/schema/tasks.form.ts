import { z } from "zod";

export const AddTaskFormSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    body: z.string().trim().min(1, "Description is required"),
});

export type TAddTaskFormSchema = z.infer<typeof AddTaskFormSchema>;
