"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/ui/Modal"
import { Input, Button } from "@/components/ui"
import { PlusIcon } from "lucide-react"
import { useAppDispatch } from "@/store/hooks"
import { addTask } from "@/store/slices/tasksSlice"
import { AddTaskFormSchema, type TAddTaskFormSchema } from "@/schema/tasks.form"

export const AddTaskModal = () => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TAddTaskFormSchema>({
        resolver: zodResolver(AddTaskFormSchema),
        defaultValues: {
            title: "",
            body: "",
        },
    })

    const onSubmit = (data: TAddTaskFormSchema) => {
        dispatch(addTask({
            userId: 1,
            title: data.title,
            body: data.body,
            status: "pending" as const,
        }))

        reset()
        setIsOpen(false)
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            reset()
        }
    }

    return (
        <Modal 
            title="Add Task" 
            description="Add a new task" 
            open={isOpen}
            onOpenChange={handleOpenChange}
            trigger={<Button variant="primary" className="cursor-pointer">
                <PlusIcon className="w-4 h-4" />
                Add Task
            </Button>}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Input 
                        type="text" 
                        placeholder="Title" 
                        {...register("title")}
                        aria-invalid={errors.title ? "true" : "false"}
                    />
                    {errors.title && (
                        <span className="text-sm text-red-500">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Input 
                        type="text" 
                        placeholder="Description" 
                        {...register("body")}
                        aria-invalid={errors.body ? "true" : "false"}
                    />
                    {errors.body && (
                        <span className="text-sm text-red-500">
                            {errors.body.message}
                        </span>
                    )}
                </div>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Task"}
                </Button>
            </form>
        </Modal>
    )
}