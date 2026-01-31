"use client"

import { Modal } from "@/ui"
import { Button, Spinner } from "@/components/ui"
import { useAppSelector } from "@/store/hooks"
import type { RootState } from "@/store/store"
import { cn } from "@/lib/utils"
import { getStatusColor, getStatusLabel } from "@/helper"
import { useComments } from "@/hooks/comments.hook"

interface ViewTaskModalProps {
    taskId: number | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ViewTaskModal = ({ taskId, open, onOpenChange }: ViewTaskModalProps) => {
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks)
    const task = tasks.find((t) => t.id === taskId)
    const { data: comments, isLoading, error } = useComments(taskId || 1)

    if (!task) {
        return null
    }

    return (
        <Modal
            className="min-w-[900px]"
            title="Task Details"
            description="View task information"
            open={open}
            onOpenChange={onOpenChange}
        >
            <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4 col-span-2 border-r border-border pr-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">
                            {task.title}
                        </h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                User ID
                            </label>
                            <div className="text-base font-semibold">
                                {task.userId}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Status
                            </label>
                            <div
                                className={cn(
                                    "inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium border",
                                    getStatusColor(task.status || "pending")
                                )}
                            >
                                {getStatusLabel(task.status || "pending")}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                            Description
                        </label>
                        <div className="text-base p-3 rounded-md border bg-background min-h-[100px] whitespace-pre-wrap">
                            {task.body}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-4">
                        Comments
                    </h2>
                    <div className="flex-1 overflow-y-auto max-h-[300px] pr-2">
                        {isLoading && (
                            <div className="flex items-center justify-center py-8">
                                <Spinner />
                            </div>
                        )}
                        {error && (
                            <div className="text-sm text-red-500 py-4">
                                Error loading comments
                            </div>
                        )}
                        {comments && comments.length > 0 ? (
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="p-3 rounded-md border bg-background space-y-2"
                                    >
                                        <p className="text-sm font-medium text-foreground">
                                            {comment.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {comment.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                            {comment.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : !isLoading && (
                            <div className="text-sm text-muted-foreground py-4">
                                No comments yet
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button
                            variant="primary"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}