let toastRef: any = null;

export const setToastRef = (ref: any) => {
    toastRef = ref;
}

export const toast = {
    success: (message: string) => {
        toastRef.setToastmessage(message);
        toastRef.setisvisible(true);
    },
    error: (message: string) => {
        toastRef.setToastmessage(message);
        toastRef.setsuccess(false);
        toastRef.setisvisible(true)
    }
}