import { fetcher } from "./fetcher";
import { TasksSchemaResponse, TTasksSchemaResponse } from "@/schema/tasks.model";

export const getTasks = async () => {
    return fetcher<TTasksSchemaResponse>("/posts", "GET").then((res) => {
        return TasksSchemaResponse.parse(res.data);
    });
}