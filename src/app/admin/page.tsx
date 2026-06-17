import { getAuthenticatedUser } from "@/lib/auth";

export default async function AdminPage() {
	const user = await getAuthenticatedUser();

	if (!user) {
		return <div>not authenticated</div>;
	}

	if (user.role !== "admin") {
		return <div>not authorized</div>;
	}

	return <div>admin only</div>;
}
