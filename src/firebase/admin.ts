import { getApps, initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^['"]|['"]$/g, "")
}

function cleanPrivateKey(value: string | undefined) {
  return cleanEnvValue(value)?.replace(/\\n/g, "\n").replace(/\r/g, "")
}

function initFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0]

  const projectId = cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
  const clientEmail = cleanEnvValue(process.env.FIREBASE_CLIENT_EMAIL)
  const privateKey = cleanPrivateKey(process.env.FIREBASE_PRIVATE_KEY)

  if (!projectId || !clientEmail || !privateKey) {
    return initializeApp()
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

const app = initFirebaseAdmin()
const databaseId = cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID)

export const adminAuth = getAuth(app)
export const adminDb = databaseId ? getFirestore(app, databaseId) : getFirestore(app)
