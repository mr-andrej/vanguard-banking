"use client";

import React, {useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {Control, useForm} from "react-hook-form";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import {noteSchema} from "@/lib/utils";
import {createNote} from "@/lib/actions/notes.actions";
import {User} from "@/types";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

const NoteForm = ({loggedIn}: { loggedIn: User }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = noteSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            const noteData = {
                title: data.title!,
                content: data.content!,
                userId: loggedIn.$id,
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString(),
            };

            const newNote = await createNote(noteData);
            console.log({loggedIn})
            console.log(newNote);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // TODO: This form needs to be turned into the create note form
    return (
        <section className="auth-form">
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CustomInput control={form.control as Control} name="title"
                                     label="Title"
                                     placeholder="Enter the title of your note"/>
                        <CustomInput control={form.control as Control} name="content" label="Content"
                                     placeholder="Enter your content"/>

                        {/*TODO: This needs to be CKEditor, whatever version is free*/}
                        <Button type="submit" disabled={isLoading} className="form-btn">{isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin"/> &nbsp;
                                Loading...
                            </>
                        ) : (
                            "Submit"
                        )}
                        </Button>
                    </form>
                </Form>


            </>
        </section>
    );
};
export default NoteForm;
