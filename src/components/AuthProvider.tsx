"use client";
import React, {
	createContext,
	useState,
	ReactNode,
	Suspense,
	useCallback,
} from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types/user";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
	error: string | null;
	clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

interface AuthProviderProps {
	children: ReactNode;
	initialUser: User | null;
}

function AuthProviderContent({ children, initialUser }: AuthProviderProps) {
	const [prevInitialUser, setPrevInitialUser] = useState<User | null>(
		initialUser,
	);
	const [user, setUser] = useState<User | null>(initialUser);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	if (initialUser !== prevInitialUser) {
		setPrevInitialUser(initialUser);
		setUser(initialUser);
	}

	const clearError = useCallback(() => setError(null), []);

	const signInWithGoogle = async () => {
		setLoading(true);
		setError(null);
		try {
			const provider = new GoogleAuthProvider();
			provider.addScope("email");
			provider.addScope("profile");
			provider.setCustomParameters({ hd: "student.chula.ac.th" });
			const result = await signInWithPopup(auth, provider);
			const idToken = await result.user.getIdToken();

			const response = await fetch("/api/auth/session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken }),
			});

			if (!response.ok) {
				const data = await response.json();
				await firebaseSignOut(auth);
				setError(data.error || "Sign in failed");
				return;
			}

			const callbackUrl = searchParams?.get("callbackUrl") || "/";
			router.push(callbackUrl);
			router.refresh();
		} catch (err) {
			// Ensure Firebase is signed out on failure to prevent stale client state
			await firebaseSignOut(auth).catch(() => {});

			// Handle common Firebase Auth errors gracefully
			if (err && typeof err === "object" && "code" in err) {
				const code = (err as { code: string }).code;
				if (
					code === "auth/popup-closed-by-user" ||
					code === "auth/cancelled-popup-request"
				) {
					return;
				}
			}

			const message =
				err instanceof Error ? err.message : "Sign in failed";
			console.error("Sign-in transaction failed:", err);
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	const signOut = async () => {
		setLoading(true);
		try {
			await firebaseSignOut(auth);
			await fetch("/api/auth/logout", { method: "POST" });
			setUser(null);
			router.push("/");
			router.refresh();
		} catch (err) {
			console.error("Sign-out failed:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signInWithGoogle,
				signOut,
				error,
				clearError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
	return (
		<Suspense
			fallback={
				<div className="flex flex-1 items-center justify-center min-h-screen">
					Loading Auth...
				</div>
			}
		>
			<AuthProviderContent initialUser={initialUser}>
				{children}
			</AuthProviderContent>
		</Suspense>
	);
}
