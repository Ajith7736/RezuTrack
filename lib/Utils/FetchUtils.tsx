import { Platform } from "react-native";
import { toast } from "../Toast/ToastUtility";
import { router } from "expo-router";


const BASE_URL = Platform.OS === 'web' ? '' : process.env.EXPO_PUBLIC_BASE_URL;


export const api = {
    get: async (url: string) => {

        const res = await fetch(`${BASE_URL ?? ''}${url}`, {
            method: 'GET'
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(resdata.message);
            return null;
        }

        return resdata;
    },
    post: async (data: any, url: string) => {

        const res = await fetch(`${BASE_URL ?? ''}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(resdata.message);
            return null;
        }

        return resdata;
    },
    delete: async (data: any, url: string) => {

        const res = await fetch(`${BASE_URL ?? ''}${url}`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(resdata.message);
            return null;
        }

        return resdata;
    },
    put: async (data: any, url: string) => {
        const res = await fetch(`${BASE_URL ?? ''}${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(resdata.message);
            return null;
        }

        return resdata;
    }
}