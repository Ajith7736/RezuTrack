let toastRef: any = null;

export const setToastRef = (ref: any) => {
    toastRef = ref;
}

export const toast = {
    success: (message: string) => {
        toastRef.setToastmessage(message);
        toastRef.settype('success')
        toastRef.setisvisible(true);
    },
    error: (message: string) => {
        toastRef.setToastmessage(message);
        toastRef.settype('error');
        toastRef.setisvisible(true)
    },
    warn: (message : string) => {
        toastRef.setToastmessage(message);
        toastRef.settype('warning');
        toastRef.setisvisible(true);
    }
}