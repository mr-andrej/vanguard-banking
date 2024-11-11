"use server";

import {ID, Query} from "node-appwrite";
import {createAdminClient} from "../appwrite";
import {parseStringify} from "../utils";
import {CreateNoteProps, getNotesProps} from "@/types";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_NOTES_COLLECTION_ID: NOTES_COLLECTION_ID,
} = process.env;

export const createNote = async (note: CreateNoteProps) => {
    try {
        const {database} = await createAdminClient();

        const newNote = await database.createDocument(
            DATABASE_ID!,
            NOTES_COLLECTION_ID!,
            ID.unique(),
            {
                ...note,
            },
        );

        return parseStringify(newNote);
    } catch (error) {
        console.log(error);
    }
};

export const getNotes = async ({userId}: getNotesProps) => {
    try {
        const {database} = await createAdminClient();
        const notes = await database.listDocuments(
            DATABASE_ID!,
            NOTES_COLLECTION_ID!,
            [Query.equal("userId", [userId])],
        );

        return parseStringify(notes.documents);
    } catch (error) {
        console.log(error);
    }
};