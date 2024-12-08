import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
			}
			return token;
		},
		async session({ session, user, token }) {
			if (session.user) {
				session.user.email = token.email ?? "";
				session.user.accessToken = token.accessToken;
				session.user.refreshToken = token.refreshToken;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60,
	},
	secret: process.env.AUTH_SECRET,
	...authConfig,
});
