import {Client, Account, Databases, Users} from "node-appwrite";

export const SESSION_COOKIE = 'appwrite-session';

const NEXT_PUBLIC_APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PUBLIC_APPWRITE_PROJECT = process.env.PUBLIC_APPWRITE_PROJECT;
const APPWRITE_KEY = process.env.APPWRITE_KEY;

export function createAdminClient() {
    const client = new Client()
        .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT)
        .setKey(APPWRITE_KEY);

    // Return the services we want to use.
    return {
        get account() {
            return new Account(client);
        },
        get database(){
            return new Databases(client);
        },
        get user(){
            return new Users(client);
        }
    };
}

export function createSessionClient(event) {
    const client = new Client()
        .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT);

    // Extract our custom domain's session cookie from the request
    const session = event.cookies.get(SESSION_COOKIE);
    if (!session) {
        throw new Error("No user session");
    }

    client.setSession(session);

    // Return the services we want to use.
    return {
        get account() {
            return new Account(client);
        }
    };
}
