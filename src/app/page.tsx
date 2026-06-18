"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import LoginButton from "@/components/LoginButton"
import { Suspense } from "react"

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div>
      <h1>VISHNU 24th</h1>
      {user ? (
        <div>
          <p>
            Logged in as: {user.nameEn.firstName} {user.nameTh.surname} ({user.id})
          </p>
          <div style={{ marginTop: "10px" }}>
            <Link href="/profile">Go to Profile</Link>
          </div>
        </div>
      ) : (
        <Suspense fallback={<div>Loading login...</div>}>
          <LoginButton />
        </Suspense>
      )}
    </div>
  )
}
