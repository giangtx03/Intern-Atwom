import React, { useEffect, useState } from 'react'
import RevenueBar from './components/RevenueBar'
import RevenuePie from './components/RevenuePie'
import { getBillDay, getBillPitch } from '../../service/AdminService';
import Spinner from '../../comp/Spinner';
import { RevenueDayModel } from '../../model/RevenueDayModel';
import { RevenuePitchModel } from '../../model/RevenuePitchModel';

export default function Revenue() {
    const [billDays, setBillDays] = useState<RevenueDayModel[]>([]);
    const [billPitches, setBillPitches] = useState<RevenuePitchModel[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();

    useEffect(() => {
        const currentDate = new Date();
        setMonth(currentDate.getMonth() + 1);
        setYear(currentDate.getFullYear());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (month && year) {
                try {
                    const result = await getBillDay(month, year);
                    setBillDays(result);
                    setIsLoading(false);
                } catch (error: any) {
                    setIsLoading(false);
                    setHttpError(error.message);
                }
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [month, year]);

    useEffect(() => {
        const fetchData = async () => {
            if (month && year) {
                try {
                    const result = await getBillPitch(month, year);
                    setBillPitches(result);
                    setIsLoading(false);
                } catch (error: any) {
                    setIsLoading(false);
                    setHttpError(error.message);
                }
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [month, year]);

    if (isLoading) {
        return <Spinner />;
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between align-items-center h-100">
            <div className='container'>
                <div className="row">
                    <div className="col-8">
                        <RevenueBar billDays={billDays} month={month!} year={year!} />
                    </div>
                    <div className="col-4">
                        <RevenuePie billPitches={billPitches} month={month!} year={year!} />
                    </div>
                </div>
            </div>
        </div>
    )
}

