import React from "react";
import HeaderBox from "@/components/headerBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccounts} from "@/lib/actions/bank.actions";

const Transfer = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({userId: loggedIn.$id});

    if (!accounts) {
        return ;
    }

    const accountsData = accounts?.data;

    return (
        <section className="payment-transfer">
            <HeaderBox
                title="Payment Transfer"
                subtext="Please make sure to provide any relevant details related to the transfer."
            />

            <section className="size-full pt-5">
                <PaymentTransferForm accounts={accountsData}/>
            </section>
        </section>
    );
};
export default Transfer;
