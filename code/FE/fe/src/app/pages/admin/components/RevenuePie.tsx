
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { RevenuePitch } from '../../../model/RevenuePitch';

type Props = {
    billPitches: RevenuePitch[];
    month: number;
    year: number
};

export default function RevenuePie(props: Props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const labelValues = props.billPitches.map(bill => bill.namePitch);
        const dataValues = props.billPitches.map(bill => bill.totalPrice);

        const data = {
            labels: labelValues,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
