"use client"
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/tasks.service";

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
}