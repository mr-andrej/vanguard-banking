import {redirect} from "next/navigation";
import React from "react";
import HeaderBox from "@/components/headerBox";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccounts} from "@/lib/actions/bank.actions";
import BankCard from "@/components/BankCard";
import {Account} from "node-appwrite";

export const dynamic = "force-dynamic";

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({userId: loggedIn.$id});

    if (!loggedIn) {
        redirect("/sign-in");
    }

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="My Bank Accounts"
                    subtext="Effortlessly manage your banking activites."
                />

                <div className="space-y-4">
                    <h2 className="header-2">
                        Your cards
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {accounts && accounts.data.map((account: Account) => (
                            <BankCard
                                key={account.id}
                                account={account}
                                userName={loggedIn?.firstName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default MyBanks;
