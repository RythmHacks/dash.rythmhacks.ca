import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    await prisma.preregistration.create({ data: { email: (await request.json()).email } });
    return new NextResponse("", {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://rythmhacks.ca",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};

export const OPTIONS = () => {
    return new NextResponse("", {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://rythmhacks.ca",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};
