"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          setState((prev) => ({
            ...prev,
            error: error.message,
            loading: false,
          }));
          return;
        }

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name:
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0],
            avatar: session.user.user_metadata?.avatar_url,
          };
          setState({ user, loading: false, error: null });
        } else {
          setState({ user: null, loading: false, error: null });
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Unknown error",
          loading: false,
        }));
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          name:
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0],
          avatar: session.user.user_metadata?.avatar_url,
        };
        setState({ user, loading: false, error: null });
      } else {
        setState({ user: null, loading: false, error: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
        return { error: error.message };
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split("@")[0],
          },
        },
      });

      if (error) {
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
        return { error: error.message };
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  };

  const signOut = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
        return { error: error.message };
      }

      setState({ user: null, loading: false, error: null });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
