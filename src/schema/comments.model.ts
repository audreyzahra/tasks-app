import { z } from "zod";

export const CommentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    body: z.string(),
});

export type TCommentSchema = z.infer<typeof CommentSchema>;

export const CommentsSchemaResponse = z.array(z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    body: z.string(),
}));

export type TCommentsSchemaResponse = z.infer<typeof CommentsSchemaResponse>;