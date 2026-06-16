import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function initFirebaseAdmin() {
	if (getApps().length > 0) return getApps()[0];

	const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

	if (!projectId || !clientEmail || !privateKey) {
		return initializeApp();
	}

	return initializeApp({
		credential: cert({ projectId, clientEmail, privateKey }),
	});
}

const app = initFirebaseAdmin();

const getAdminAuth = () => getAuth(app);
const getAdminDb = () => getFirestore(app);

export { getAdminAuth, getAdminDb };
