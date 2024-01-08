import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef();
  let myChart = null;

  useEffect(() => {
    Chart.defaults.scale.grid.display = false;

    const buildChart = () => {
      const myChartRef = chartRef.current.getContext("2d");

      myChart = new Chart(myChartRef, {
        type: "bar",
        data: {
          labels: data.dates,
          datasets: [
            {
              label: "line",
              data: data.data.line,
              type: "line",
              borderColor: "rgb(121, 121, 121)",
              fill: false,
              tension: 0.4,
            },
            {
              label: "sqlInjection",
              data: data.data.sqlInjection,
              backgroundColor: "#ced6ee",
              borderWidth: 0,
              categoryPercentage: 0.6,
              barPercentage: 0.7,
              borderRadius: 10,
            },
            {
              label: "authBroken",
              data: data.data.authBroken,
              backgroundColor: "#bbeef1",
              borderWidth: 0,
              categoryPercentage: 0.6,
              barPercentage: 0.7,
              borderRadius: 10,
            },
            {
              label: "xss",
              data: data.data.xss,
              backgroundColor: "#c7e8f7",
              borderWidth: 0,
              categoryPercentage: 0.6,
              barPercentage: 0.7,
              borderRadius: 10,
            },
          ],
        },

        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      });
    };

    buildChart();

    return () => {
      if (myChart) myChart.destroy();
    };
  }, [data]);

  return (
    <div className="chartingen">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
