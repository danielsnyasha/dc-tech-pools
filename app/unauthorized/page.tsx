"use client";

import { useEffect, useState, Suspense } from "react";
import { useClerk } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Shield, LogOut, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function UnauthorizedContent() {
  const { signOut } = useClerk();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(10);

  const userEmail = searchParams.get("email");
  const status = searchParams.get("status"); // "pending" | "denied" | null
  const dbError = searchParams.get("error") === "db";

  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      setCountdown((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          if (mounted) signOut({ redirectUrl: "/" });
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [signOut]);

  const isPending = status === "pending" && !dbError;
  const isDenied = status === "denied" && !dbError;

  const tone = isPending
    ? { bg: "bg-amber-100 dark:bg-amber-900/30", fg: "text-amber-600 dark:text-amber-400", Icon: Clock }
    : { bg: "bg-red-100 dark:bg-red-900/30", fg: "text-red-600 dark:text-red-400", Icon: isDenied ? XCircle : Shield };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${tone.bg}`}>
              <tone.Icon className={`w-8 h-8 ${tone.fg}`} />
            </div>
          </div>

          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            {dbError
              ? "Can't Verify Access"
              : isPending
              ? "Awaiting Approval"
              : isDenied
              ? "Request Declined"
              : "Access Denied"}
          </CardTitle>

          <CardDescription className="text-gray-600 dark:text-gray-300">
            {dbError
              ? "The server could not reach the database to check your authorization."
              : isPending
              ? "Your account is signed in, but not yet authorized for the admin portal."
              : isDenied
              ? "An administrator has declined access for this account."
              : "You don't have permission to access the admin portal."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isPending && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2 text-amber-700 dark:text-amber-400 font-medium text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="break-all">Request sent for {userEmail}</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-500">
                The administrators have been notified and will review your request. You&apos;ll be
                able to sign in to the portal once one of them approves it.
              </p>
            </div>
          )}

          {isDenied && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-xs text-red-600 dark:text-red-400">
                Access for <span className="font-semibold break-all">{userEmail}</span> was declined.
                Contact an administrator directly if you believe this is a mistake.
              </p>
            </div>
          )}

          {dbError && (
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This is a server configuration problem, not a permissions one. If you are an
                administrator, check that <code className="font-mono">DATABASE_URL</code> is set.
              </p>
            </div>
          )}

          {!isPending && !isDenied && !dbError && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Only authorized admin emails can access this area.
            </p>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Signing you out in{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{countdown}s</span>...
          </p>

          <Button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UnauthorizedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnauthorizedContent />
    </Suspense>
  );
}
