"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      return;
    }
    router.push(redirect);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="pad-x-page mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Welcome back</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to continue building and learning.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-background/70 p-8 shadow-sm backdrop-blur">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 font-semibold"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
