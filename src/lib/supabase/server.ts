import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const createClient = () => {
  // Cast to the correct type to handle the cookies synchronously
  const cookieStore = cookies() as unknown as ReadonlyRequestCookies;
  
  // Return the Supabase client with cookie methods
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          try {
            // Get cookie by name
            const cookie = cookieStore.get(name);
            return cookie ? cookie.value : undefined;
          } catch (error) {
            console.error(`Error getting cookie "${name}":`, error);
            return undefined;
          }
        },
        set: (name: string, value: string, options: CookieOptions) => {
          try {
            // Set cookie
            cookieStore.set(name, value, options);
          } catch (error) {
            console.error(`Error setting cookie "${name}":`, error);
          }
        },
        remove: (name: string, options: Omit<CookieOptions, 'value'>) => {
          try {
            // Remove cookie by setting an empty value
            cookieStore.set(name, '', options);
          } catch (error) {
            console.error(`Error removing cookie "${name}":`, error);
          }
        },
      },
    }
  );
};