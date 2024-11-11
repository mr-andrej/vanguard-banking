import React from "react";
import NoteForm from "@/components/NoteForm";

const Page = () => {
    return (
        <section className="flex-center size-full max-sm:px-6">
            <NoteForm type="create"/>
        </section>
    );
};
export default Page;
