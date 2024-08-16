
import React, { useState, useEffect } from 'react';
import { getEditPitch } from '../../service/AdminService';
import Spinner from '../../comp/Spinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EditPitchModel } from '../../model/EditPitchModel';
import { Dialog } from 'primereact/dialog';
import PitchTimeTable from './components/PitchTimeTable';
import { set } from 'react-hook-form';

export default function BasicDemo() {
    const [pitches, setPitches] = useState<EditPitchModel[]>([]);
    const [pitchId, setPitchId] = useState<number>();


    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEditPitch();
                setPitches(result);
                setIsLoading(false);

            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return (
            <Spinner />
        )
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const handleClick = (rowData: any) => {
        setPitchId(rowData.id);
        setVisible(true);
    };

    const nameTemplate = (rowData: any) => {
        return (
            <span onClick={() => handleClick(rowData)} style={{ cursor: 'pointer', color: 'blue' }}>
                {rowData.name}
            </span>
        );
    };

    return (
        <div className="card">
            <DataTable value={pitches} selectionMode="single" tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" body={nameTemplate}></Column>
                <Column field="address" header="Address"></Column>
                <Column field="createAt" header="Create"></Column>
                <Column field="updateAt" header="Update"></Column>
                <Column field="type" header="Type"></Column>
                <Column field="sumTime" header="Sum time"></Column>
                <Column field="sumImg" header="Sum img"></Column>
            </DataTable>
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <PitchTimeTable pitchId={pitchId!} />
            </Dialog>
        </div>
    )
}
