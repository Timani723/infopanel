
'use server';

import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import {eq} from "drizzle-orm";

export async function getUsers(){
    try {
    const allUsers = await db.select().from(users);
    return allUsers;
} catch (error) {
    console.error(error);
   throw error;
}

}

export async function createUser(user : Omit<User, "id" | "createdAt" | "updatedAt">) {
    try {
        await db.insert(users).values(user);
        revalidatePath("/");
        return { success: true };
    } catch(error) {
        console.error(error);
        return {error: "Failed to create user"};
    }
}

export async function updateUser(id: string | undefined, user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    try {
    await db.insert(users).values(user);
    revalidatePath("/");
    return { success: true };
    } catch(error) {
     console.error(error);
     return {error: "Failed to update user"};
    }
}

export async function deleteUser(id: string) {
    try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/");
    return { success: true };
    
} catch(error) {
    console.error(error);
    return {error: "Failed to delete user"}
}
}