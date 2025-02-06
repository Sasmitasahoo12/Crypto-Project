import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ sparkline, priceChange }) {
    const chartData = {
        series: [{ data: sparkline.price }], 
        options: {
            chart: {
                type: "line",
                height: 50,
                sparkline: { enabled: true },
            },
            stroke: { width: 2 },
            colors: [priceChange > 0 ? "#00C853" : "#D50000"], 
            tooltip: { enabled: false },
        },
    };

    return <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={50} />;
}

export default Chart;
