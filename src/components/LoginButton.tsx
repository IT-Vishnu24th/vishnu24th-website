"use client"

import { useAuth } from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"

const ERROR_MESSAGES: Record<string, string> = {
  "user-disabled": "This account has been disabled",
  "unauthorized-domain": "Authentication is not allowed from this domain",
  "network-request-failed": "Network connection error",
  "invalid-email-domain": "Please sign in with a valid email",
  "profile-not-found": "This account is not registered",
  "missing-id-token": "Authentication token is missing",
  "email-not-provided": "Could not retrieve email from your Google account",
  "internal-server-error": "An internal server error occurred",
  "sign-in-failed": "Sign-in failed",
}

export default function LoginButton() {
  const { signInWithGoogle, loading, error } = useAuth()
  const searchParams = useSearchParams()

  const handleSignIn = () => {
    const callbackUrl = searchParams?.get("callbackUrl") || "/"
    signInWithGoogle(callbackUrl)
  }

  const userFacingError = error ? ERROR_MESSAGES[error] || ERROR_MESSAGES["sign-in-failed"] : null

  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-2">
      {userFacingError && (
        <p className="text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          {userFacingError}
        </p>
      )}

      <button
        onClick={handleSignIn}
        disabled={loading}
        className="relative w-full flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform select-none active:scale-[0.98] disabled:opacity-60 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm group cursor-pointer"
      >
        {loading ? <span>Signing in...</span> : <span>Sign in with Google</span>}
      </button>
    </div>
  )
}
