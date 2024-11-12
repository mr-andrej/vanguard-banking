import React from "react";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {BankTabItem} from "@/components/BankTabItem";
import BankInfo from "@/components/BankInfo";
import TransactionsTable from "@/components/TransactionsTable";
import {Pagination} from "@/components/Pagination";
import {Account, RecentTransactionsProps} from "@/types";

const RecentTransactions = ({accounts, transactions = [], appwriteItemId, page = 1}: RecentTransactionsProps) => {
    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent transactions
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className="view-all-btn">
                    View all
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accounts.map((account: Account) => (
                    <TabsContent
                        key={account.id}
                        value={account.appwriteItemId}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />
                        <TransactionsTable transactions={currentTransactions}/>

                        {totalPages > 1 && (
                            <div className="my-4 w-full">
                                <Pagination page={page} totalPages={totalPages}/>
                            </div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};
export default RecentTransactions;
