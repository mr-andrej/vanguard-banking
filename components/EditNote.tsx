import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {updateNote} from "@/lib/actions/notes.actions";
import {EditNoteProps} from "@/types";

const EditNote = ({isOpen, onClose, note, onNoteUpdated}: EditNoteProps) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateNote({
            documentId: note.$id,
            title,
            content,
        });
        onNoteUpdated();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Content"
                        />
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditNote;