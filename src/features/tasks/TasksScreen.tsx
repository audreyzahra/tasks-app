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
        <div className="p-8 h-screen flex flex-col"
        >
            <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <h1 className="text-4xl font-extrabold text-purple-400"
                >
                    Tasks and To-Do Lists
                </h1>
                <AddTaskModal />
            </div>
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <div>Error loading tasks</div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <TasksTable data={tasks} />
                    </div>
                )}
            </div>
        </div>
    )
}