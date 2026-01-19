import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth.config";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            console.error("Unauthorized POST /api/user/image: No session or email");
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { image } = body;

        if (!image) {
            return NextResponse.json({ success: false, message: "Image required" }, { status: 400 });
        }

        const accessToken = (session as any).access_token;
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const res = await fetch(`${baseUrl}/api/v1/users/image`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email: session.user.email, image })
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ success: false, message: data.message }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in /api/user/image:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
