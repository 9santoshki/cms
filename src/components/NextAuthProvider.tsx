'use client';

import { SessionContextProvider } from '@/lib/supabase/SessionContextProvider';
import { createClient } from '@/lib/supabase/client';

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}