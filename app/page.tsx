import { redirect } from "next/navigation";
import {getLoggedInUser} from "@/lib/actions/user.actions";

export default async function Home() {
    const user = await getLoggedInUser();

    if (!user) redirect("/signup");

    redirect("/account");
}
