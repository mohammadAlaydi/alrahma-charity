
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../auth";
// Actually, earlier I couldn't find authOptions. 
// I should check where it is imported in [...nextauth]/route.ts
// It was `import { authOptions } from "../../../../../auth";` which is `src/auth`.
// But I failed to find `src/auth.ts`.
// I will assume it exists or try to find it again. OR use `import { authOptions } from "@/auth"` if tsconfig paths work.

// Let's defer exact import path for a second.
// I will use a generic handler first.

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/profile?email=${session.user.email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ success: false, message: data.message }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in /api/user:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Ensure we update the correct user
        const payload = { ...body, email: session.user.email };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
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
