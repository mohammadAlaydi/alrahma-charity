
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../auth"; // Adjust path as needed

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { image } = body;

        if (!image) {
            return NextResponse.json({ success: false, message: "Image required" }, { status: 400 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
