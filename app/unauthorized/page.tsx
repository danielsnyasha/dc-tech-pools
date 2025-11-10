"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Shield, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const { signOut } = useClerk();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let mounted = true;

    // Countdown timer
    const countdownInterval = setInterval(() => {
      if (mounted) {
        setCountdown(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            clearInterval(countdownInterval);
            // Sign out when countdown reaches 0
            if (mounted) {
              console.log('Auto sign out triggered');
              signOut({ redirectUrl: "/" });
            }
            return 0;
          }
          return newValue;
        });
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(countdownInterval);
    };
  }, [signOut]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            You don&apos;t have permission to access the admin portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Your account is not authorized to access the admin portal. Only whitelisted admin emails can access this area.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-semibold">
            Signing you out in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
          <Button
            onClick={() => signOut({ redirectUrl: "/" })}
            variant="gradient"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
