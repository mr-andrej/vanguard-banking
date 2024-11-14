"use client";

import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import React from "react";
import {DoughnutChartProps} from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
    const accountNames = accounts.map((account) => account.name);
    const balances = accounts.map((account) => account.currentBalance);

    const data = {
        datasets: [
            {
                label: "Banks",
                data: balances,
                backgroundColor: ["#12d4e6", "#2265d8", "#571694"],
            },
        ],
        labels: accountNames,
    };

    return <Doughnut
        data={data}
        options={{
            cutout: "60%",
            plugins: {
                legend: {
                    display: false,
                },
            },
        }}
    />;
};
export default DoughnutChart;
