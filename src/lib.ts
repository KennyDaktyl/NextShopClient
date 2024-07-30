"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const secret = `${process.env.SECRET_KEY}`;
const key = new TextEncoder().encode(secret);

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
    return {
        success: true,
        message: "Logout successful.",
    };
}

export async function encrypt(payload: Record<string, unknown>) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(key);
}

export async function decrypt(token: string) {
    return await jwtVerify(token, key, { algorithms: ["HS256"] });
}

export async function getSession() {
	const sessions = await auth();
	if (sessions && sessions.user && (sessions.user as { accessToken?: string }).accessToken) {
		return (sessions.user as { accessToken: string }).accessToken;
	}
	return null;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("authjs.session-token")?.value;
    if (!session) {
        return;
    }

    const parsed = await decrypt(session);
    const new_expires = new Date(Date.now() + 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set(
        "authjs.session-token",
        await encrypt({
            username: parsed.payload.username as string,
            access_token: parsed.payload.access_token as string,
            refresh_token: parsed.payload.refresh_token as string,
            expires: new_expires,
        }),
        {
            httpOnly: true,
            expires: new_expires,
            secure: true,
            sameSite: "strict",
            path: "/",
        },
    );
    return res;
}
