import { z } from "zod";

export const TaskStatus = z.enum(["pending", "completed"]);
export type TTaskStatus = z.infer<typeof TaskStatus>;

export const TaskSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
    status: TaskStatus.default("pending"),
});

export type TTaskSchema = z.infer<typeof TaskSchema>;

export const TasksSchemaResponse = z.array(z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
    status: TaskStatus.default("pending"),
}));

export type TTasksSchemaResponse = z.infer<typeof TasksSchemaResponse>;