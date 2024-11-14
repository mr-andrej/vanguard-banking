"use client";

import React, {useState} from "react";
import {getNotes} from "@/lib/actions/notes.actions";
import HeaderBox from "@/components/headerBox";
import EditNote from "@/components/EditNote";
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";

type Note = {
    $id: string;
    title: string;
    content: string;
};

type NotesContentProps = {
    initialNotes: Note[];
    userId: string;
};

const NotesContent = ({initialNotes, userId}: NotesContentProps) => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const fetchNotes = async () => {
        try {
            const fetchedNotes = await getNotes({userId});

            if (fetchedNotes) {
                setNotes(fetchedNotes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (note: Note) => {
        setSelectedNote(note);
        setIsEditDialogOpen(true);
    };

    return (
        <section className="notes">
            {notes?.map((note) => (
                <div key={note.$id} className="flex items-center justify-between w-[50%]">
                    <HeaderBox
                        title={note.title}
                        subtext={note.content}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(note)}
                    >
                        <PencilIcon className="h-6 w-6"/>
                        Edit
                    </Button>
                </div>
            ))}

            {selectedNote && (
                <EditNote
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    note={selectedNote}
                    onNoteUpdated={fetchNotes}
                />
            )}
        </section>
    );
};

export default NotesContent;