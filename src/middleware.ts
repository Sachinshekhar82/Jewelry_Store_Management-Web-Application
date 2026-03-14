import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Define public routes that don't need authentication
    const isPublicRoute = path === "/login" || path === "/signup";

    const session = await getSession();

    if (!isPublicRoute && !session?.userId) {
        // Redirect to login if unauthenticated user tries to access a protected route
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if ((path === "/login" || path === "/signup") && session?.userId) {
        // Redirect to dashboard (or home) if logged in user tries to access login/signup
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
