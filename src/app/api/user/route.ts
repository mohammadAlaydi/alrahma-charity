import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth.config";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        // Try to get session using getServerSession
        const session = await getServerSession(authOptions);
        
        // Fallback: try to get token from JWT
        const token = session ? null : await getToken({ 
            req, 
            secret: process.env.NEXTAUTH_SECRET 
        });

        // Use session if available, otherwise construct from token
        const userEmail = session?.user?.email || token?.email;
        const accessToken = (session as any)?.access_token || token?.access_token;

        if (!userEmail) {
            console.error("Unauthorized: No session or email", { 
                hasSession: !!session, 
                hasToken: !!token,
                hasEmail: !!userEmail 
            });
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const res = await fetch(`${baseUrl}/api/v1/users/profile`, {
            method: 'GET',
            headers
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ success: false, message: data.message }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in /api/user GET:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        // Try to get session using getServerSession
        const session = await getServerSession(authOptions);
        
        // Fallback: try to get token from JWT
        const token = session ? null : await getToken({ 
            req, 
            secret: process.env.NEXTAUTH_SECRET 
        });

        const body = await req.json();

        // Use session if available, otherwise construct from token
        const userEmail = session?.user?.email || token?.email;
        const accessToken = (session as any)?.access_token || token?.access_token;

        if (!userEmail) {
            console.error("Unauthorized PATCH: No session or email", { 
                hasSession: !!session, 
                hasToken: !!token,
                hasEmail: !!userEmail 
            });
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const res = await fetch(`${baseUrl}/api/v1/users/profile`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ success: false, message: data.message }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in PATCH /api/user:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
