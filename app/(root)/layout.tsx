import Sidebar from "@/components/Sidebar";
import MobileNavBar from "@/components/MobileNavBar";
import Image from "next/image";
import React from "react";

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = { firstName: "Jean-Claude", lastName: "LGD"}

    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar user={loggedIn}/>

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src="/icons/logo.svg"
                        width={30}
                        height={30}
                        alt="Menu icon"
                    />
                    <div>
                        <MobileNavBar user={loggedIn}/>
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
