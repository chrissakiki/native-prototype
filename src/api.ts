import axios, { isAxiosError } from "axios";
import store from "./store/store";

type APIResponse<T> = {
    data: T | null,
    status: number
}

// Guest Users
const apiFetch = axios.create({
    baseURL: 'https://api.poilgroup.com/api/admin',
})

// Authenticated Users
const authFetch = axios.create({
    baseURL: 'https://api.poilgroup.com/api/admin',
})

// Request Interceptors

authFetch.interceptors.request.use(
    (config) => {

        const state = store.getState();
        const token = state.user.token;

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }


        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptors

authFetch.interceptors.response.use((response) => {

    return response;
}, (error) => {
    if (isAxiosError(error) && error?.status === 401) {
        // logout
    }
    return Promise.reject(error);
})

type GET = {
    endpoint: string;
    params?: { [key: string]: string | number | Array<number> };
    requiresAuth?: boolean
}
export const GET = async <T,>({ endpoint, params, requiresAuth = true }: GET): Promise<APIResponse<T>> => {

    const config = {
        params,
    };

    try {
        const response = await (requiresAuth ? authFetch : apiFetch).get(endpoint, config);

        return {
            data: response?.data,
            status: response.status
        }


    } catch (error) {
        const axiosError = isAxiosError(error);
        return {
            data: axiosError ? error?.response?.data?.errors : null,
            status: axiosError ? (error?.response?.status || 500) : 500
        }
    }

}

type POST = {
    endpoint: string;
    formData?: { [key: string]: any } | FormData;
    requiresAuth?: boolean;
}


export const POST = async <T,>({ endpoint, formData, requiresAuth }: POST): Promise<APIResponse<T>> => {
    try {
        const response = await (requiresAuth ? authFetch : apiFetch).post(endpoint, formData);
        return {
            data: response?.data,
            status: 200,
        }
    } catch (error) {
        const axiosError = isAxiosError(error);

        return {
            data: axiosError ? error.response?.data?.errors : null,
            status: axiosError ? (error.response?.status || 500) : 500
        }
    }


}