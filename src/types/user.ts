// TODO: complete user schema
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	role: "admin" | "senior" | "junior";
}
