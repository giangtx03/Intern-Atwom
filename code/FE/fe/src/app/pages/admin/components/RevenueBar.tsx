import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { RevenueDayModel } from '../../../model/RevenueDayModel';

type Props = {
    billDays: RevenueDayModel[];
    month: number;
    year: number
};

export default function RevenueBar(props: Props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const days: number[] = [];
        const values: number[] = [];

        const getDaysInMonth = (month: number, year: number) => {

            return new Date(year, month + 1, 0).getDate();
        };

        const daysInMonth = getDaysInMonth(props.month, props.year);
        for (let i = 0; i < daysInMonth; i++) {
            days.push(i + 1);
            const bill = props.billDays.find(bill => bill.dayOfMonth === (i + 1));
            values.push(bill ? bill.totalPrice! : 0);
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: days,
            datasets: [
                {
                    label: `Doanh thu tháng ${props.month + 1}`,
                    data: values,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [props.billDays, props.month, props.year]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
