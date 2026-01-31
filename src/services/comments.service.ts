import { fetcher } from "./fetcher";
import { CommentsSchemaResponse, TCommentsSchemaResponse } from "@/schema/comments.model";

export const getComments = async (id: number) => {
    return fetcher<TCommentsSchemaResponse>(`/comments?postId=${id}`, "GET").then((res) => {
        return CommentsSchemaResponse.parse(res.data);
    });
}