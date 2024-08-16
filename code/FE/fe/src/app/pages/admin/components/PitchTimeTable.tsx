import React, { useEffect, useState } from 'react';
import { PitchTimeModel } from '../../../model/PitchTimeModel';
import Spinner from '../../../comp/Spinner';
import { getPitchTimeByPitchId } from '../../../service/AdminService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Props = {
    pitchId: number;
}

export default function PitchTimeTable(props: Props) {
    const [pitchTimes, setPitchTimes] = useState<PitchTimeModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPitchTimeByPitchId(props.pitchId);
                setPitchTimes(result);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchData();
    }, [props.pitchId]);

    if (isLoading) {
        return <Spinner />;
    }

    if (httpError) {
        return (
            <div className="card">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="card">
            <DataTable value={pitchTimes} selectionMode="single" tableStyle={{ minWidth: '50rem' }}>
                <Column field="startTime" header="Giờ bắt đầu"></Column>
                <Column field="endTime" header="Giờ kết thúc"></Column>
                <Column field="price" header="Giá"></Column>
            </DataTable>
        </div>
    );
}
