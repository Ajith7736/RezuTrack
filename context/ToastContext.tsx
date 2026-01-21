import { setToastRef, toast } from "@/lib/Toast/ToastUtility";
import { createContext, ReactNode, useContext, useState } from "react";


interface ToastProps {
    isvisible: boolean,
    setisvisible: React.Dispatch<React.SetStateAction<boolean>>,
    Toastmessage: string,
    setToastmessage: React.Dispatch<React.SetStateAction<string>>,
    success: boolean,
    setsuccess: React.Dispatch<React.SetStateAction<boolean>>,
}


const ToastContext = createContext<ToastProps | undefined>(undefined)

export default function ToastProvider({ children }: { children: ReactNode }) {

    const [isvisible, setisvisible] = useState<boolean>(false)

    const [Toastmessage, setToastmessage] = useState<string>('')

    const [success, setsuccess] = useState<boolean>(true);

    const value = { setisvisible, setToastmessage, setsuccess }

    setToastRef(value);

    return <ToastContext.Provider value={{ isvisible, setisvisible, setToastmessage, Toastmessage, success, setsuccess }}>
        {children}
    </ToastContext.Provider>
}

export function useToast() {
    const data = useContext(ToastContext);
    if (!data) {
        throw new Error('Use useToast hook inside the provider')
    }

    return data;
}