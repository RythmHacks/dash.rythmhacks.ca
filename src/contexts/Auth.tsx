import { useContext, useEffect, useState, createContext, PropsWithChildren } from 'react';
import { supabase } from '../supabaseClient';
import { AuthUser } from '@supabase/supabase-js';

const signUp = supabase.auth.signUp.bind(supabase.auth),
      signInWithOtp =  supabase.auth.signInWithOtp.bind(supabase.auth),
      signOut = supabase.auth.signOut.bind(supabase.auth);

export interface AuthProviderValue {
    signUp: typeof signUp,
    signInWithOtp: typeof signInWithOtp,
    signOut: typeof signOut,
    user: AuthUser | null
}

const AuthContext = createContext<AuthProviderValue | null>(null)

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateAuthData = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            setUser(session?.user || null);
            setLoading(false);
        
            supabase.auth.onAuthStateChange(async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            });
        };

        updateAuthData();

    }, []);
    
    const value: AuthProviderValue = {
        signUp,
        signInWithOtp,
        signOut,
        user,
    };

    return <AuthContext.Provider value={value!}>{!loading && children}</AuthContext.Provider>
};

const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within <AuthContext.Provider>")
    }
    return authContext;
};

export { AuthProvider, useAuth };
