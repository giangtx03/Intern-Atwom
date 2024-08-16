
import React, { useState, useEffect } from 'react';
import { getEditPitch } from '../../service/AdminService';
import Spinner from '../../comp/Spinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EditPitchModel } from '../../model/EditPitchModel';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PitchTimeTable from './components/PitchTimeTable';
import { set } from 'react-hook-form';
import StepPitch from './components/crud/StepPitch';

export default function BasicDemo() {
    const [pitches, setPitches] = useState<EditPitchModel[]>([]);
    const [pitchId, setPitchId] = useState<number>();

    const [btnSubmit, setBtnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [visibleTime, setVisibleTime] = useState<boolean>(false);
    const [visiblePitch, setVisiblePitch] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEditPitch();
                setPitches(result);
                setIsLoading(false);
                setBtnSubmit(false);
            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
                setBtnSubmit(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [btnSubmit]);

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

    const handleClickTime = (rowData: any) => {
        setPitchId(rowData.id);
        setVisibleTime(true);
    };

    const sumTime = (rowData: any) => {
        return (
            <span onClick={() => handleClickTime(rowData)} style={{ cursor: 'pointer', color: 'blue' }}>
                {rowData.sumTime}
            </span>
        );
    };

    return (
        <div className="">
            <Button
                className={`rounded-2 my-2 text-start`}
                label="Add"
                onClick={() => setVisiblePitch(true)}
            />
            <div className="card">
                <DataTable value={pitches} selectionMode="single" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Tên sân" ></Column>
                    <Column field="address" header="Địa chỉ sân"></Column>
                    <Column field="createAt" header="Ngày tạo"></Column>
                    <Column field="updateAt" header="Ngày cập nhật"></Column>
                    <Column field="type" header="Loại sân"></Column>
                    <Column field="sumTime" header="Giờ hoạt động" body={sumTime}></Column>
                    <Column field="sumImg" header="Ảnh minh họa"></Column>
                </DataTable>
                <Dialog header="Các giờ hoạt động" visible={visibleTime} style={{ width: '60vw' }} onHide={() => { if (!visibleTime) return; setVisibleTime(false); }}>
                    <PitchTimeTable pitchId={pitchId!} />
                </Dialog>
                <Dialog header="Thêm sân" visible={visiblePitch} style={{ width: '90vw', height: '90vh' }} onHide={() => {
                    if (!visiblePitch) return; setVisiblePitch(false);
                    setBtnSubmit(true);
                }}>
                    <StepPitch setBtnSubmit={setBtnSubmit} />
                </Dialog>
            </div>
        </div>
    )
}
