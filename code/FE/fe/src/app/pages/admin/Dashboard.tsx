import React, { useEffect, useState } from 'react';
import RevenueBar from './components/RevenueBar';
import RevenuePie from './components/RevenuePie';
import { getBillDay, getBillPitch } from '../../service/AdminService';
import Spinner from '../../comp/Spinner';
import { RevenueDayModel } from '../../model/RevenueDayModel';
import { RevenuePitchModel } from '../../model/RevenuePitchModel';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

export default function Revenue() {
    const [billDays, setBillDays] = useState<RevenueDayModel[]>([]);
    const [billPitches, setBillPitches] = useState<RevenuePitchModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();
    const [date, setDate] = useState<Nullable<Date>>(null);


    const currentDate = new Date();

    useEffect(() => {
        setDate(currentDate);
        setMonth(currentDate.getMonth() + 1);
        setYear(currentDate.getFullYear());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (month && year) {
                try {
                    setIsLoading(true);
                    const [billDaysData, billPitchesData] = await Promise.all([
                        getBillDay(month, year),
                        getBillPitch(month, year)
                    ]);
                    setBillDays(billDaysData);
                    setBillPitches(billPitchesData);
                } catch (error: any) {
                    setHttpError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [month, year]);

    const maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth());
    maxDate.setFullYear(currentDate.getFullYear());

    const sumPrice = billDays.reduce((acc, data) => acc + data.totalPrice!, 0);

    const formattedMaxDate = maxDate.toLocaleDateString('en-GB', { month: '2-digit', year: 'numeric' });

    const handleChange = (e: any) => {
        const selectedDate = e.value as Date;
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setDate(selectedDate);
    }

    if (isLoading) {
        return (
            <div className="progress-spinner text-center">
                <div className="swm-loader"></div>
            </div>
        );
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between align-items-start h-100">
            <div className='container'>
                <div className="d-flex justify-content-between align-items-center my-2">
                    <h3>
                        <span>Tổng doanh thu: </span>
                        <span style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '0 10px' }}>
                            {sumPrice.toLocaleString()}
                        </span>
                        <span> VND</span>
                    </h3>
                    <h3>
                        <span>Tháng: </span>
                        <Calendar
                            value={date}
                            onChange={handleChange}
                            view="month"
                            dateFormat="mm/yy"
                            maxDate={maxDate}
                            placeholder={formattedMaxDate}
                        />
                    </h3>
                </div>
                <div className="row">
                    <div className="col-8">
                        <RevenueBar billDays={billDays} month={month! - 1} year={year!} />
                    </div>
                    <div className="col-4">
                        <RevenuePie billPitches={billPitches} month={month! - 1} year={year!} />
                    </div>
                </div>
            </div>
        </div>
    );
}

