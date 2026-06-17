"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";

export default function LoginButton() {
	const { signInWithGoogle, loading, error } = useAuth();
	const searchParams = useSearchParams();

	const handleSignIn = () => {
		const callbackUrl = searchParams?.get("callbackUrl") || "/";
		signInWithGoogle(callbackUrl);
	};

	return (
		<div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-2">
			{error && (
				<p className="text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-1 duration-200">
					{error}
				</p>
			)}

			<button
				onClick={handleSignIn}
				disabled={loading}
				className="relative w-full flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform select-none active:scale-[0.98] disabled:opacity-60 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm group cursor-pointer"
			>
				{loading ? (
					<span>Signing in...</span>
				) : (
					<span>Sign in with Google</span>
				)}
			</button>
		</div>
	);
}
