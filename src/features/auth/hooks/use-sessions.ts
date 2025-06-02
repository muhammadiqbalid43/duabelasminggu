import supabase from "@/lib/supabase-client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, updatedSession) => {
        setSession(updatedSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { session, loading };
}
