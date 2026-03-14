"use server";

import bcrypt from "bcryptjs";
import { login, logout } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function signupUser(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string || null;

    if (!username || !password || password.length < 6) {
        return { error: "Username and password (min 6 characters) are required." };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return { error: "Username already exists." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                name,
                role: "USER"
            }
        });

        await login(user.id);
        revalidatePath('/');
    } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        console.error("Signup error details:", {
            message: err.message,
            stack: err.stack,
            code: err.code
        });
        return { error: `Signup failed: ${err.message || "An unexpected error occurred."}` };
    }
    redirect('/');
}

export async function loginUser(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log(`[Auth] Login attempt for user: ${username}`);
    const startTime = Date.now();

    if (!username || !password) {
        return { error: "Username and password are required." };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return { error: "Invalid credentials." };
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log(`[Auth] Password match result: ${passwordsMatch} (Time taken: ${Date.now() - startTime}ms)`);

        if (!passwordsMatch) {
            return { error: "Invalid credentials." };
        }

        await login(user.id);
        console.log(`[Auth] Session created for ${username}. Redirecting...`);
        revalidatePath('/');
    } catch (error: unknown) {
        console.error("Login error details:", error);
        return { error: "Login failed. Please try again." };
    }
    redirect('/');
}

export async function logoutUser() {
    await logout();
    revalidatePath('/');
    redirect('/login');
}

