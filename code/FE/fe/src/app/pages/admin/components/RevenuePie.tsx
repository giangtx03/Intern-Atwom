import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { RevenuePitchModel } from '../../../model/RevenuePitchModel';

type Props = {
    billPitches: RevenuePitchModel[];
    month: number;
    year: number
};

export default function RevenuePie(props: Props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labelValues = props.billPitches.map(bill => bill.namePitch);
        const dataValues = props.billPitches.map(bill => bill.totalPrice);

        // Tạo danh sách màu dựa trên số lượng dữ liệu
        const generateColors = (numColors: number) => {
            const colors = [];
            for (let i = 0; i < numColors; i++) {
                const hue = (i * 360 / numColors) % 360;
                colors.push(`hsl(${hue}, 70%, 50%)`); // Sử dụng hsl để tạo màu sắc
            }
            return colors;
        };

        const backgroundColors = generateColors(dataValues.length);
        const hoverBackgroundColors = generateColors(dataValues.length).map(color => color.replace('50%', '60%'));

        const data = {
            labels: labelValues,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: hoverBackgroundColors,
                }
            ]
        };

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
    }, [props.billPitches]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
