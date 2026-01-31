"use client"

import { useState } from "react"
import { TTasksSchemaResponse, TTaskSchema } from "@/schema/tasks.model";
import { Table, Dropdown } from "@/ui";
import { TableRow, TableCell } from "@/components/ui/table";
import { TrashIcon, EllipsisVerticalIcon, EyeIcon } from "lucide-react";
import { Button, Select } from "@/components/ui";
import { useAppDispatch } from "@/store/hooks";
import { deleteTask, updateTaskStatus } from "@/store/slices/tasksSlice";
import { ViewTaskModal } from "./ViewTaskModal";
import { cn } from "@/lib/utils";
import { getStatusColor } from "@/helper";

interface TasksTableProps {
    data: TTasksSchemaResponse;
}

export const TasksTable = ({
    data
}: TasksTableProps) => {
    const dispatch = useAppDispatch()
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const handleView = (id: number) => {
        setSelectedTaskId(id)
        setIsViewModalOpen(true)
    }

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id))
        }
    }

    const handleStatusChange = (id: number, status: "pending" | "completed") => {
        dispatch(updateTaskStatus({ id, status }))
    }

    return (
        <>
            <Table<TTaskSchema>
                className="border-1 border-gray-300 rounded-lg"
                header={["", "ID", "Title", "Description", "Status"]}
                data={data}
                renderRow={(task) => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <Dropdown
                                trigger={
                                    <Button variant="ghost" size="icon">
                                        <EllipsisVerticalIcon className="w-4 h-4 text-gray-500" />
                                    </Button>
                                }
                                items={[
                                    {
                                        label: "View",
                                        icon: <EyeIcon className="w-4 h-4" />,
                                        onClick: () => handleView(task.id),
                                    },
                                    {
                                        separator: true,
                                    },
                                    {
                                        label: "Delete",
                                        icon: <TrashIcon className="w-4 h-4 text-red-500" />,
                                        onClick: () => handleDelete(task.id),
                                        variant: "destructive",
                                    },
                                ]}
                                align="start"
                            />
                        </TableCell>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.body}</TableCell>
                        <TableCell>
                            <Select
                                value={task.status ?? "pending"}
                                onChange={(e) => {
                                    e.preventDefault()
                                    const newStatus = e.target.value as "pending" | "completed"
                                    if (newStatus !== task.status) {
                                        handleStatusChange(task.id, newStatus)
                                    }
                                }}
                                className={cn(
                                    "w-32 cursor-pointer",
                                    task.status === "completed" 
                                        ? getStatusColor("completed") 
                                        : getStatusColor("pending")
                                )}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </Select>
                        </TableCell>
                    </TableRow>
                )}
                searchable={true}
                searchPlaceholder="Search tasks by title, description, or ID..."
                searchKeys={["title", "body", "id", "status"]}
                itemsPerPage={10}
                showPagination={true}
                statusFilterable={true}
                statusFilterKey="status"
                statusFilterOptions={[
                    { value: "all", label: "All" },
                    { value: "pending", label: "Pending" },
                    { value: "completed", label: "Completed" },
                ]}
            />
            <ViewTaskModal
                taskId={selectedTaskId}
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />
        </>
    )
}