"use server";

import {createSessionClient} from "@/lib/appwrite";

export const signIn = async () => {
    try {
        // Mutation / DB / Make a fetch
    } catch (error) {
        console.error("Error", error);
    }
};

export const signUp = async (userData: SignUpParams) => {
    try {
        // Create a user account with Appwrite

    } catch (error) {
        console.error("Error", error);
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = createSessionClient({});
        return await account.get();
    } catch (error) {
        return null;
    }
}