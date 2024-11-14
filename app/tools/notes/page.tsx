import {Suspense} from "react";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getNotes} from "@/lib/actions/notes.actions";
import {redirect} from "next/navigation";
import NotesContent from "@/components/NotesContent";

const Page = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }

    const initialNotes = await getNotes({userId: loggedIn.userId});

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotesContent initialNotes={initialNotes} userId={loggedIn.userId}/>
        </Suspense>
    );
};

export default Page;