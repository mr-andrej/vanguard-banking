import React from "react";
import NoteForm from "@/components/NoteForm";
import {getLoggedInUser} from "@/lib/actions/user.actions";

const Page = async () => {
    const loggedIn = await getLoggedInUser();

    return (
        <div className="flex-center size-full max-sm:px-6">
            <NoteForm loggedIn={loggedIn}/>
        </div>
    );
};
export default Page;
