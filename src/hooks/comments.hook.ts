import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/services/comments.service";
import { TCommentsSchemaResponse } from "@/schema/comments.model";

export const useComments = (id: number) => {
    return useQuery<TCommentsSchemaResponse, Error>({
        queryKey: ["comments", id],
        queryFn: () => getComments(id),
    });
};