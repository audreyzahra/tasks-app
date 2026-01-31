"use client"

import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./slices/tasksSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
