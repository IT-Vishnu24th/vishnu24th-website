import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/firebase/admin";

const STUDENT_EMAIL_PATTERN = /^6[89]\d{6}21@student\.chula\.ac\.th$/;
const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 5; // 5 days

export async function POST(request: Request) {
	try {
		const { idToken } = await request.json();
		if (!idToken) {
			return NextResponse.json(
				{ error: "Missing ID token" },
				{ status: 400 },
			);
		}

		// Verify ID token
		const decodedToken = await adminAuth.verifyIdToken(idToken);
		const email = decodedToken.email;
		if (!email) {
			return NextResponse.json(
				{ error: "No email found" },
				{ status: 400 },
			);
		}

		// Validate email 68 or 69 and ends with 21
		if (!STUDENT_EMAIL_PATTERN.test(email)) {
			return NextResponse.json(
				{ error: "This email is not a valid student account" },
				{ status: 403 },
			);
		}
		const studentId = email.split("@")[0];

		// Check if user in firestore
		const userDoc = await adminDb.collection("users").doc(studentId).get();
		if (!userDoc.exists) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 404 },
			);
		}

		// Create session cookie
		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn: SESSION_EXPIRES_IN_MS,
		});

		const cookieStore = await cookies();
		cookieStore.set("session", sessionCookie, {
			maxAge: SESSION_EXPIRES_IN_MS / 1000,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
		});

		return NextResponse.json(
			{ message: "Sign in successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Session creation error:", error);

		return NextResponse.json({ error: "Sign in failed" }, { status: 500 });
	}
}
