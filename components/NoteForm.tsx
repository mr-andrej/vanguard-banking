"use client";

import React, {useState} from "react";
import Link from "next/link";

import {zodResolver} from "@hookform/resolvers/zod";
import {Control, useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import {noteSchema} from "@/lib/utils";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {createNote} from "@/lib/actions/notes.actions";

const NoteForm = async ({type}: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = noteSchema();
    const loggedIn = await getLoggedInUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            if (type === "create") {
                const noteData = {
                    title: data.title!,
                    content: data.content!,
                    userId: loggedIn.userId,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                const newNote = await createNote(noteData);

                setUser(newNote);
            }

            console.log(data);
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
                        {type === "sign-up" && (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control as Control} name="firstName"
                                                 label="First Name"
                                                 placeholder="Enter your first name"/>
                                    <CustomInput control={form.control as Control} name="lastName" label="Last Name"
                                                 placeholder="Enter your last name"/>
                                </div>

                                <CustomInput control={form.control as Control} name="address1" label="Address"
                                             placeholder="Enter your home address"/>

                                <CustomInput control={form.control as Control} name="city" label="City"
                                             placeholder="Enter your city"/>

                                <div className="flex gap-4">
                                    <CustomInput control={form.control as Control} name="state" label="State"
                                                 placeholder="Example: NY"/>
                                    <CustomInput control={form.control as Control} name="postalCode"
                                                 label="Postal Code"
                                                 placeholder="Example: 11101"/>
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control as Control} name="dateOfBirth"
                                                 label="Date of Birth" type="date" value=""
                                                 placeholder="DD-MM-YYYY"/>
                                    <CustomInput control={form.control as Control} name="ssn" label="SSN"
                                                 placeholder="Example: 1234"/>
                                </div>
                            </>
                        )}
                        <CustomInput control={form.control as Control} name="email" label="Email"
                                     placeholder="Enter your email"/>
                        <CustomInput control={form.control as Control} name="password" label="Password"
                                     type="password"
                                     placeholder="Enter your password"/>
                        <div className="flex flex-col gap-4">
                            <Button type="submit" disabled={isLoading} className="form-btn">{isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin"/> &nbsp;
                                    Loading...
                                </>
                            ) : type === "sign-in"
                                ? "Sign in" : "Sign up"}
                            </Button>
                        </div>
                    </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type === "sign-in"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </p>
                    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
                        {type === "sign-in" ? "Sign up" : "Sign in"}
                    </Link>
                </footer>
            </>
        </section>
    );
};
export default NoteForm;
