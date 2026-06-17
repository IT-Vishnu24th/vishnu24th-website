import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

/**
 * Custom React hook to access the current authentication state and actions.
 * This helper is client-only (React Client Components).
 * 
 * Provides:
 * - `user`: The currently signed-in User object or null.
 * - `loading`: Boolean indicating if an authentication transaction is in progress.
 * - `error`: Error messages from failed actions (e.g. invalid email domains).
 * - `signInWithGoogle`: Function to initiate client-side Google popup authentication.
 * - `signOut`: Function to log out and clear client/server sessions.
 */
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
export default useAuth;
