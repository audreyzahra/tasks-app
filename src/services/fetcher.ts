import axiosDefault, { AxiosError } from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axiosDefault.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export { axiosInstance };

export async function fetcher<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
) {
    return axiosInstance<T>({
        url: endpoint,
        method,
        data,
    }).catch((err: AxiosError<T>) => {
        throw err;
    });
}