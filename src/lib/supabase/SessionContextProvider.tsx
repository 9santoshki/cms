'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  role: string;
}

interface SessionContextType {
  session: Session | null;
  user: any | null; // Replace 'any' with your actual User type
  profile: UserProfile | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionContextProviderProps {
  supabaseClient: SupabaseClient;
  children: ReactNode;
}

export function SessionContextProvider({
  supabaseClient,
  children
}: SessionContextProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        // Fetch user profile from profiles table
        const { data: profileData, error: profileError } = await supabaseClient
          .from('profiles')
          .select('id, role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error getting user profile:', profileError);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);

      const {
        data: { subscription },
      } = await supabaseClient.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);

          if (session?.user) {
            // Fetch user profile from profiles table
            supabaseClient
              .from('profiles')
              .select('id, role')
              .eq('id', session.user.id)
              .single()
              .then(({ data: profileData, error: profileError }) => {
                if (profileError) {
                  console.error('Error getting user profile:', profileError);
                  setProfile(null);
                } else {
                  setProfile(profileData);
                }
              });
          } else {
            setProfile(null);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    getInitialSession();
  }, [supabaseClient]);

  return (
    <SessionContext.Provider value={{ session, user, profile, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      'useSessionContext must be used within a SessionContextProvider'
    );
  }
  return context;
};