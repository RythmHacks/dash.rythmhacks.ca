import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await prisma.preregistration.create({ data: { email: (await request.json()).email } });

        return new NextResponse("", {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://rythmhacks.ca",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            return new NextResponse("email already exists", {
                status: 400,
                headers: {
                    "Access-Control-Allow-Origin": "https://rythmhacks.ca",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }
    }
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
