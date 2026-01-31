"use client"
import { useEffect } from "react"
import { useTasks } from "@/hooks/tasks.hook"
import { TasksTable, AddTaskModal } from "./";
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { mergeTasks } from "@/store/slices/tasksSlice"
import type { RootState } from "@/store/store"
import { Spinner } from "@/components/ui"

export default function Home() {
    const { data: apiData, isLoading, error } = useTasks();
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks)

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            dispatch(mergeTasks(apiData))
        }
    }, [apiData, dispatch])

    return (
        <div className="p-8 space-y-8"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold"
                >
                    Tasks and To-Do Lists
                </h1>
                <AddTaskModal />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <Spinner />
                ) : error ? (
                    <div>Error loading tasks</div>
                ) : (
                    <TasksTable data={tasks} />
                )}
            </div>
        </div>
    )
}