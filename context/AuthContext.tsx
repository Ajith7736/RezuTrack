import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const AuthContext = createContext<{ session: Session | null, isLoading: boolean }>({ session: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setisLoading] = useState(true)
    const [session, setsession] = useState<Session | null>(null);

    useEffect(() => {

        supabase.auth.getSession().then(async ({
            data: { session }
        }) => {
            setsession(session)
            if (session?.user.id) {
                Purchases.logIn(session.user.id);
            }
            setisLoading(false)
        })

        const { data: AuthListener } = supabase.auth.onAuthStateChange(async (
            _event, session
        ) => {
            setsession(session);
            if(_event === 'SIGNED_OUT'){
                Purchases.logOut();
            }
            if (session?.user.id) {
                Purchases.logIn(session.user.id);
            }
            setisLoading(false)
        })

        return () => {
            AuthListener.subscription.unsubscribe();
        }
    }, [])



    return (
        <AuthContext.Provider value={{ session, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSession = () => {
    const { session, isLoading } = useContext(AuthContext);
    return { session, isLoading };
}