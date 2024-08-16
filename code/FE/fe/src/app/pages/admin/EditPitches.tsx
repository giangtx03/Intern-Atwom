
import React, { useState, useEffect } from 'react';
import { getEditPitch } from '../../service/AdminService';
import Spinner from '../../comp/Spinner';
import { DataTable, DataTableCellSelection } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { EditPitchModel } from '../../model/EditPitchModel';
import { Dialog } from 'primereact/dialog';

export default function BasicDemo() {
    const [pitches, setPitches] = useState<EditPitchModel[]>([]);


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
        console.log('Clicked row:', rowData);
        // Thực hiện các hành động khác với rowData
    };

    const nameTemplate = (rowData: any) => {
        return (
            <span onClick={() => setVisible(true)} style={{ cursor: 'pointer', color: 'blue' }}>
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
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    )
}
