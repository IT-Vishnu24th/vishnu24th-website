"use client"
import React, { createContext, useState, ReactNode } from "react"
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/firebase/client"
import { useRouter } from "next/navigation"
import { User } from "@/types/user"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: (callbackUrl?: string) => Promise<void>
  signOut: () => Promise<void>
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  initialUser: User | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [prevInitialUser, setPrevInitialUser] = useState<User | null>(initialUser)
  const [user, setUser] = useState<User | null>(initialUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  if (initialUser !== prevInitialUser) {
    setPrevInitialUser(initialUser)
    setUser(initialUser)
  }

  const signInWithGoogle = async (callbackUrl?: string) => {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ hd: "student.chula.ac.th" })
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })

      if (!response.ok) {
        const data = await response.json()
        await firebaseSignOut(auth)
        setError(data.error || "internal-server-error")
        return
      }

      router.push(callbackUrl || "/")
      router.refresh()
    } catch (err) {
      // Ensure Firebase is signed out on failure to prevent stale client state
      await firebaseSignOut(auth).catch(() => {})

      const code =
        err && typeof err === "object" && "code" in err && typeof err.code === "string"
          ? err.code
          : null

      // Handle common Firebase Auth errors gracefully
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        return
      }

      console.error("Sign-in transaction failed:", err)
      setError(code ? code.replace("auth/", "") : "sign-in-failed")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await firebaseSignOut(auth)
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (err) {
      console.error("Sign-out failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
