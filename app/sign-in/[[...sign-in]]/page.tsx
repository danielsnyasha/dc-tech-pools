import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-violet-50 to-fuchsia-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/pool/logo.png"
              alt="DC Tech Pools"
              width={300}
              height={100}
              className="block dark:hidden h-12 w-auto mx-auto object-contain"
              priority
            />
            <Image
              src="/images/pool/logo-light.png"
              alt="DC Tech Pools"
              width={300}
              height={100}
              className="hidden dark:block h-12 w-auto mx-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to access the admin portal</p>
        </div>
        <SignIn
          forceRedirectUrl="/admin"
          signUpForceRedirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl",
            }
          }}
        />
      </div>
    </div>
  );
}
