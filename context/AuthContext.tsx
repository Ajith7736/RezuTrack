import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const AuthContext = createContext<{ session: Session | null, isLoading: boolean, refreshSession: () => Promise<void> }>({ session: null, isLoading: true, refreshSession: async () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setisLoading] = useState(true)
    const [session, setsession] = useState<Session | null>(null);


    const refreshSession = async () => {
        const { data: { session: refreshSession } } = await supabase.auth.refreshSession();
        setsession(refreshSession);
    }

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
            if (_event === 'SIGNED_OUT') {
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
        <AuthContext.Provider value={{ session, isLoading, refreshSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSession = () => {
    const { session, isLoading, refreshSession } = useContext(AuthContext);
    return { session, isLoading, refreshSession };
}