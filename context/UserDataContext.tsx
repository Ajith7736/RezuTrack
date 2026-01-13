import { createContext, ReactElement, ReactNode, useContext, useState } from "react";

type ContextProps = {
    userdata: Record<string, string> ,
    setuserdata: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const UserDataContext = createContext<undefined | ContextProps>(undefined)

export const UserDataProvider = ({ children }: { children: ReactNode }) => {

    const [userdata, setuserdata] = useState<Record<string, string>>({});

    return <UserDataContext.Provider value={{ userdata, setuserdata }}>
        {children}
    </UserDataContext.Provider>
}

export function useUserData() {
    const userData = useContext(UserDataContext);

    if (!userData) {
        throw new Error("Use useUserData hook inside the provider")
    }

    return userData;
}

