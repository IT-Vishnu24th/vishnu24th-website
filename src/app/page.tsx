"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import LoginButton from "@/components/LoginButton";

export default function HomePage() {
	const { user } = useAuth();

	return (
		<div>
			<h1>VISHNU 24th</h1>
			{user ? (
				<div>
					<p>
						Logged in as: {user.firstName} {user.lastName} (
						{user.id})
					</p>
					<div style={{ marginTop: "10px" }}>
						<Link href="/profile">Go to Profile</Link>
					</div>
				</div>
			) : (
				<LoginButton />
			)}
		</div>
	);
}
