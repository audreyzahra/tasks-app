export const getStatusColor = (status: string) => {
    return status === "completed"
        ? "bg-green-50 border-green-200 text-green-700"
        : "bg-yellow-50 border-yellow-200 text-yellow-700"
}

export const getStatusLabel = (status: string) => {
    return status === "completed" ? "Completed" : "Pending"
}