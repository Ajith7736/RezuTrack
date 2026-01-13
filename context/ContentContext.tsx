import { createContext, ReactNode, useContext, useState } from "react";


interface Contentprops {
    selectedcontents: Set<string>,
    setselectedcontents: React.Dispatch<React.SetStateAction<Set<string>>>
}


const ContentContext = createContext<Contentprops | undefined>(undefined)


export default function ContentProvider({ children }: { children: ReactNode }) {
    const [selectedcontents, setselectedcontents] = useState<Set<string>>(new Set())
    return <ContentContext.Provider value={{ selectedcontents, setselectedcontents }}>
        {children}
    </ContentContext.Provider>
}

export const useContent = () => {
    const data = useContext(ContentContext);
    if(!data){
        throw new Error("Use useContent inside the Provider")
    }

    return data;
}