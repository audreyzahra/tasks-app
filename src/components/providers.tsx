"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import StoreProvider from "@/store/StoreProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  )

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StoreProvider>
  )
}
