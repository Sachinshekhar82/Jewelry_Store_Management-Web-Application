import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "fallback_secret_for_development_purposes";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: string; expires: Date }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<{ userId: string; expires: Date } | null> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload as { userId: string; expires: Date };
}

export async function login(userId: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ userId, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const sessionCookie = cookies().get("session")?.value;
    if (!sessionCookie) return null;
    try {
        return await decrypt(sessionCookie);
    } catch {
        return null;
    }
}
