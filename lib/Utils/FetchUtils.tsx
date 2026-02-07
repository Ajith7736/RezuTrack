import { toast } from "../Toast/ToastUtility";

export const api = {
    get: async (data: any, url: string) => {

        const res = await fetch(url, {
            method: 'GET'
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(data.message);
        }

        return resdata;
    },
    post: async (data: any, url: string) => {

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(data.message);
        }

        return resdata;
    },
    delete : async (data: any, url: string) => {

        const res = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(data.message);
        }

        return resdata;
    },
    put : async (data: any, url: string) => {

        const res = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resdata = await res.json();

        if (!res.ok) {
            toast.error(data.message);
        }

        return resdata;
    }
}