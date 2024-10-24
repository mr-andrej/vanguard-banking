"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({amount}: { amount: number }) => {
    return (
        <div>
            <CountUp
                duration={2}
                decimals={2}
                prefix="€"
                end={amount}

            />
        </div>
    );
};
export default AnimatedCounter;
