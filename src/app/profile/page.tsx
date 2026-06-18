"use client"

import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth()

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Your Profile</h1>
      {user ? (
        <div style={{ margin: "20px 0" }}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
      <button
        onClick={signOut}
        disabled={loading}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        {loading ? "Signing out..." : "Sign Out"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <Link href="/">Back to Home</Link>
      </div>
    </div>
  )
}
