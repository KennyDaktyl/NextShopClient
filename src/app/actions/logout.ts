"use server";
import { signOut } from "@/auth";

export const LogOut = () => {
	console.log("Logging out...");
	signOut({ redirectTo: "/" });
};
