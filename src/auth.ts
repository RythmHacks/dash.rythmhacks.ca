import { prisma } from "@/prisma";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
    interface User extends Partial<PrismaUser> {}
    interface Session {
        user?: User;
    }
}

export const config = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            profile: (_profile: GoogleProfile) => ({
                id: _profile.sub,
                name: _profile.given_name,
                lastName: _profile.family_name ?? "",
                email: _profile.email,
                image: _profile.picture,
            }),
        }),
    ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
