import React from "react";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getNotes} from "@/lib/actions/notes.actions";
import {redirect} from "next/navigation";
import {Account} from "node-appwrite/dist";
import BankCard from "@/components/BankCard";

const Page = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }

    const notes = await getNotes({userId: loggedIn.userId});
    console.log({notes});

    return (
        <div>
            {notes?.map((note, index) => (
                <div>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};
export default Page;
