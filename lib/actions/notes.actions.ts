"use server";

import {ID, Query} from "node-appwrite";
import {createAdminClient} from "../appwrite";
import {parseStringify} from "../utils";
import {CreateNoteProps, getNoteByIdProps, getNotesProps, UpdateNoteProps} from "@/types";

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
            [
                Query.equal("userId", [userId]),
            ],
        );

        return parseStringify(notes.documents);
    } catch (error) {
        console.log(error);
    }
};

export const getNoteById = async ({documentId}: getNoteByIdProps) => {
    try {
        const {database} = await createAdminClient();
        const note = await database.listDocuments(
            DATABASE_ID!,
            NOTES_COLLECTION_ID!,
            [Query.equal("$id", [documentId])],
        );

        return parseStringify(note.documents);
    } catch (error) {
        console.log(error);
    }
};

export const updateNote = async ({documentId, title, content}: UpdateNoteProps) => {
    try {
        const {database} = await createAdminClient();
        const updatedNote = await database.updateDocument(
            DATABASE_ID!,
            NOTES_COLLECTION_ID!,
            documentId,
            {
                title,
                content,
            },
        );

        return parseStringify(updatedNote);
    } catch (error) {
        console.log(error);
    }
};