import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/firebase/admin";
import { User } from "@/types/user";

/**
 * Retrieves the currently authenticated user from the session cookie.
 * This helper is server-only (React Server Components, API route handlers, Server Actions).
 */
export async function getAuthenticatedUser(): Promise<User | null> {
	try {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get("session")?.value;

		if (!sessionCookie) {
			return null;
		}

		// check revocation false for now?
		const decodedToken = await adminAuth.verifySessionCookie(
			sessionCookie,
			false,
		);
		const email = decodedToken.email;

		if (!email) {
			return null;
		}

		const studentId = email.split("@")[0];
		const userDoc = await adminDb.collection("users").doc(studentId).get();

		if (!userDoc.exists) {
			return null;
		}

		const data = userDoc.data();
		return {
			id: studentId,
			firstName: data?.firstName || "",
			lastName: data?.lastName || "",
			role: data?.role || "",
		};
	} catch {
		return null;
	}
}
