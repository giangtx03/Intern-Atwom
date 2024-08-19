import React, { useEffect, useState } from 'react';
import { PitchTimeModel, PitchTimeRequest } from '../../../model/PitchTimeModel';
import Spinner from '../../../comp/Spinner';
import { getPitchTimeByPitchId } from '../../../service/AdminService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface TimeSlot {
    id: number;
    time: string;
}

type Props = {
    pitchId: number;
}

export default function PitchTimeTable(props: Props) {
    const [pitchTimes, setPitchTimes] = useState<PitchTimeModel[]>([]);
    const [pitchTime, setPitchTime] = useState<PitchTimeRequest>();
    const [timeSlot, setTimeSlot] = useState<TimeSlot>();
    const [isLoading, setIsLoading] = useState(true);
    const [visibleTime, setVisibleTime] = useState<boolean>(false);
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

    // pitchTimes.map(data => )

    const openNew = () => {
        setVisibleTime(true);
    };

    const handleTimeSlot = (e: any) => {
        setTimeSlot({ ...timeSlot, id: e.id, time: `${e.startTime} - ${e.endTime}` })
    }

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
        <div className="">
            <div className="my-1">
                <Button icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
            <div className="card my-1">
                <DataTable value={pitchTimes} selectionMode="single" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="startTime" header="Giờ bắt đầu"></Column>
                    <Column field="endTime" header="Giờ kết thúc"></Column>
                    <Column field="price" header="Giá"></Column>
                </DataTable>

            </div>
            <Dialog header="Sửa giờ sân" visible={visibleTime} style={{ width: '60vw' }} onHide={() => { if (!visibleTime) return; setVisibleTime(false); }}>

                <div className="field">
                    <label htmlFor="type">Loại sân</label>
                    <Dropdown id="type" value={timeSlot} onChange={(e) => handleTimeSlot(e.value)} options={pitchTimes} optionLabel="id" required
                        placeholder="Chọn giờ" />
                </div>
            </Dialog>
        </div>
    );
}
