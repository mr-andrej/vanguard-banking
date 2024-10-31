import React from "react";
import Image from "next/image";
import {logoutAccount} from "@/lib/actions/user.actions";
import {useRouter} from "next/navigation";

const Footer = ({user, type = "desktop"}: FooterProps) => {
    const router = useRouter();
    const handleLogOut = async () => {
        const loggedOut = await logoutAccount();

        if (loggedOut) {
            router.push("/sign-in");
        }
    };

    return (
        <footer className="footer">
            <div className={type === "desktop" ? "footer_name" : "footer_name-mobile"}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName[0].toUpperCase()}
                </p>
            </div>

            <div className={type === "desktop" ? "footer_email" : "footer_email-mobile"}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.firstName}
                </h1>
                <p className="text-12 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>

            <div className="footer_image" onClick={handleLogOut}>
                <Image src="icons/logout.svg" fill alt="logout"/>
            </div>
        </footer>
    );
};
export default Footer;
