import { ProfileInput } from "@/lib/schema/ProfileSchema";
import { createContext, ReactElement, ReactNode, useContext, useState } from "react";

type ContextProps = {
    userdata: ProfileInput | null,
    setuserdata: React.Dispatch<React.SetStateAction<ProfileInput | null>>
}

const UserDataContext = createContext<undefined | ContextProps>(undefined)

export const UserDataProvider = ({ children }: { children: ReactNode }) => {

    const [userdata, setuserdata] = useState<ProfileInput | null>(null);

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

