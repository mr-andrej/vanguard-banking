import React from "react";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getNotes} from "@/lib/actions/notes.actions";
import {redirect} from "next/navigation";
import HeaderBox from "@/components/headerBox";

const Page = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }

    const notes = await getNotes({userId: loggedIn.userId});
    console.log({notes});

    return (
        <section className="notes">
            {notes?.map((note) => (
                <HeaderBox
                    title={note.title}
                    subtext={note.content}
                />
            ))}
        </section>
    );
};
export default Page;
