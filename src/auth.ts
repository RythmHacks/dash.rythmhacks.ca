import { prisma } from "@/prisma";
import NextAuth, { NextAuthConfig } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
    interface User extends Partial<PrismaUser> {}
    interface Session {
        user?: Partial<User>;
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
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = {
                    id: user.id ?? "",
                    name: user.name,
                    lastName: user.lastName,
                    joinedDiscord: user.joinedDiscord,
                    email: user.email ?? "",
                    emailVerified: user.emailVerified ?? null,
                    image: user.image,
                } satisfies AdapterUser;
            }
            return token;
        },
        session: ({ session, token }) => {
            // don't allow sensitive data to make it to the client
            session.user = token.user as AdapterUser;

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
