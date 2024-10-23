"use server";

import {createAdminClient, createSessionClient} from "../appwrite";
import {ID} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {cookies} from "next/headers";

export const signIn = async () => {
    try {
        // Mutation / DB / Make a fetch
    } catch (error) {
        console.error("Error", error);
    }
};

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;

    try {
        const {account} = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`,
        );

        const session = await account.createEmailPasswordSession(email, password);

        const cookiesStore = cookies();
        (cookiesStore as any).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error("Error", error);
    }
};

export async function getLoggedInUser() {
    try {
        const {account} = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);
    } catch (error) {
        return null;
    }
}