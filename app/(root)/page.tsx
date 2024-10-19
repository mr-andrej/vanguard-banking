import React from 'react'
import HeaderBox from "@/components/headerBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
    const loggedIn = {firstName: "Jean-Claude", lastName: "LGD", email: "jeanclaude.lgd@gmail.com"};

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={3}
                        totalCurrentBalance={3350.25}
                    />
                </header>

                RECENT TRANSACTIONS
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50}, {currentBalance: 500}]}
            />
        </section>
    )
}
export default Home;
