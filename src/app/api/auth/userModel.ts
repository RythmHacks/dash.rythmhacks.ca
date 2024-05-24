"use server"
import prisma from "@/prisma"
import {Prisma, User} from "@prisma/client"

// const pool = new Pool({
//     user: 'enkailiu',
//     host: 'localhost',
//     database: 'rythmhacksdash',
//     password: 'root',
//     port: 5432,
// });

export const addUser = async (user: User) => {
    try {
        return await prisma.user.create({data: user})
    } catch (err: unknown) { 
        if (err instanceof Error) {
            throw new Error(`An error occurred: ${err.message}`);
        } else {
            throw new Error('An error occurred, and it is not an instance of Error');
        }
    }
};

export const updateUser = async (query: Prisma.UserUpdateArgs) => {
    try {
        return await prisma.user.update(query);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`An error occurred while updating the user: ${err.message}`);
        } else {
            throw new Error('An unknown error occurred during user update');
        }
    }
};

export const getUser = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {id}
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`An error occurred while retrieving the user: ${err.message}`);
        } else {
            throw new Error('An unknown error occurred during user retrieval');
        }
    }
};