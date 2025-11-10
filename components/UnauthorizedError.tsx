"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UnauthorizedError() {
  const searchParams = useSearchParams();
  const [showUnauthorizedError, setShowUnauthorizedError] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setShowUnauthorizedError(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowUnauthorizedError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showUnauthorizedError) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top duration-300">
      <p className="font-semibold">Access Denied</p>
      <p className="text-sm">
        You don&apos;t have permission to access the admin portal.
      </p>
    </div>
  );
}
