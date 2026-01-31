"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TTaskSchema } from "@/schema/tasks.model"

interface TasksState {
  tasks: TTaskSchema[]
}

const loadTasksFromLocalStorage = (): TTaskSchema[] => {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem("tasks")
    if (stored) {
      const tasks = JSON.parse(stored)
      return tasks.map((task: any) => ({
        ...task,
        status: task.status || "pending",
      }))
    }
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error)
  }
  return []
}

const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
}

const saveTasksToLocalStorage = (tasks: TTaskSchema[]) => {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<TTaskSchema, "id">>) => {
      const maxId = state.tasks.length > 0 
        ? Math.max(...state.tasks.map(t => t.id))
        : 0
      const newTask: TTaskSchema = {
        ...action.payload,
        id: maxId + 1,
      }
      state.tasks.push(newTask)
      saveTasksToLocalStorage(state.tasks)
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      saveTasksToLocalStorage(state.tasks)
    },
    updateTask: (state, action: PayloadAction<TTaskSchema>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        saveTasksToLocalStorage(state.tasks)
      }
    },
    setTasks: (state, action: PayloadAction<TTaskSchema[]>) => {
      state.tasks = action.payload
      saveTasksToLocalStorage(state.tasks)
    },
    mergeTasks: (state, action: PayloadAction<TTaskSchema[]>) => {
      const existingIds = new Set(state.tasks.map(t => t.id))
      const newTasks = action.payload
        .filter(t => !existingIds.has(t.id))
        .map(task => ({
          ...task,
          status: task.status || "pending",
        }))
      state.tasks = [...state.tasks, ...newTasks]
      saveTasksToLocalStorage(state.tasks)
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: "pending" | "completed" }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
        saveTasksToLocalStorage(state.tasks)
      }
    },
  },
})

export const { addTask, deleteTask, updateTask, setTasks, mergeTasks, updateTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer
