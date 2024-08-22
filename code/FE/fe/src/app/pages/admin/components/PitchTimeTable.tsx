import React, { useEffect, useState } from 'react';
import { PitchTimeModel, PitchTimeRequest } from '../../../model/PitchTimeModel';
import Spinner from '../../../comp/Spinner';
import { deletePitchTime, getPitchTimeByPitchId, getTimeSlotAll, postPitchTime, putPitchTime } from '../../../service/AdminService';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { TimeSlot } from '../../../model/TimeSlot';

interface TimeSlotResponse {
    id?: number;
    time?: string;
}

type Props = {
    pitchId: number;
}

export default function PitchTimeTable(props: Props) {
    const [pitchTimes, setPitchTimes] = useState<PitchTimeModel[]>([]);
    const [pitchTime, setPitchTime] = useState<PitchTimeRequest>();
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [timeSlotResponse, setTimeSlotResponse] = useState<TimeSlotResponse>();
    const [visibleTime, setVisibleTime] = useState<boolean>(false);
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
    const [deletePitchTimeDialog, setDeletePitchTimeDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    const _pitchTimeNew: PitchTimeRequest = {
        pitchId: props.pitchId,
        price: undefined,
        timeSlotId: undefined
    }

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
        setPitchTime({ ...pitchTime, pitchId: props.pitchId })
    }, [props.pitchId, btnSubmit]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTimeSlotAll();
                setTimeSlots(result);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchData();
    }, []);


    const timeSlotResponses: TimeSlotResponse[] = timeSlots
        .filter(ts => !pitchTimes.some(data => data.startTime === ts.startTime))
        .map(ts => ({
            id: ts.id!,
            time: `${ts.startTime} - ${ts.endTime}`
        }));

    const openNew = () => {
        setPitchTime(_pitchTimeNew);
        setTimeSlotResponse({ id: undefined, time: undefined })
        setVisibleTime(true);
    };

    const handleTimeSlot = (e: any) => {
        setTimeSlotResponse(e)
        setPitchTime({ ...pitchTime, timeSlotId: e.id })
    }

    const handleSubmit = async () => {
        try {
            const result = await postPitchTime(pitchTime!);
            console.log(result)
        } catch (error: any) {
            setIsLoading(false);
            setHttpError(error.message);
        }
        setBtnSubmit(!btnSubmit);
        setVisibleTime(false);
    }

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
        const { newData, index } = e;
        const updatedPitchTime = {
            ...pitchTime,
            price: newData.price,
            timeSlotId: newData.idTime,
        };

        try {
            const result = await putPitchTime(updatedPitchTime);
            console.log(result);

            const updatedPitchTimes = [...pitchTimes];
            updatedPitchTimes[index] = newData;
            setPitchTimes(updatedPitchTimes);
        } catch (error: any) {
            setIsLoading(false);
            setHttpError(error.message);
        }
    };

    const deleteTime = async () => {
        try {
            const result = await deletePitchTime(pitchTime?.pitchId!, pitchTime?.timeSlotId!);
            console.log(result)
        } catch (error: any) {
            setIsLoading(false);
            setHttpError(error.message);
        }
        console.log(pitchTime)
        setBtnSubmit(!btnSubmit);
        setDeletePitchTimeDialog(false);
    }

    const allowEdit = () => {
        return true;
    };

    const priceEditor = (options: ColumnEditorOptions) => {
        return <InputNumber value={options.value} onValueChange={(e: InputNumberValueChangeEvent) => options.editorCallback!(e.value)} mode="currency" currency="VND" locale="vi-VN" />;
    };

    const hideDeletePitchTimeDialog = () => {
        setDeletePitchTimeDialog(false);
    };

    const confirmDeletePitchTime = (temp: PitchTimeModel) => {
        setPitchTime({ ...pitchTime, timeSlotId: temp.idTime, price: temp.price });
        setTimeSlotResponse({ ...timeSlotResponse, id: temp.idTime!, time: `${temp.startTime} - ${temp.endTime}` })
        setDeletePitchTimeDialog(true);
    };

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

    const deleteBtn = (rowData: PitchTimeModel) => {
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-times-circle" rounded outlined severity="danger" /> */}
                <i className="pi pi-times-circle" onClick={() => confirmDeletePitchTime(rowData)}></i>
            </React.Fragment>
        );
    }

    const deletePitchTimeDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className='me-2' outlined onClick={hideDeletePitchTimeDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteTime} />
        </React.Fragment>
    );

    return (
        <div className="">
            <div className="my-1">
                <Button icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
            <div className="card my-1">
                {pitchTimes.length === 0
                    ?
                    <div className="text-center my-5">
                        Chưa có khung giờ nào được thêm
                    </div>
                    :
                    <>
                        <DataTable value={pitchTimes} selectionMode="single" editMode="row" onRowEditComplete={onRowEditComplete}>
                            <Column field="startTime" header="Giờ bắt đầu" style={{ width: '8rem' }}></Column>
                            <Column field="endTime" header="Giờ kết thúc" style={{ width: '8rem' }}></Column>
                            <Column field="price" header="Giá" editor={(options) => priceEditor(options)}></Column>
                            <Column rowEditor={allowEdit} headerStyle={{ width: '6rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                            <Column style={{ width: '1rem', padding: 0, paddingRight: '1rem' }} body={deleteBtn}></Column>
                        </DataTable>
                    </>

                }

            </div>
            <Dialog header="Sửa giờ sân" visible={visibleTime} onHide={() => { if (!visibleTime) return; setVisibleTime(false); }}>
                <div className="d-flex justify-content-between align-items-center my-1">
                    {timeSlotResponses.length === 0
                        ?
                        <div className="">Khung giờ sân đã đủ</div>
                        :
                        <>
                            <div className="flex-grow-1 me-2">
                                <Dropdown
                                    id="type"
                                    value={timeSlotResponse}
                                    onChange={(e) => handleTimeSlot(e.value)}
                                    options={timeSlotResponses}
                                    optionLabel="time"
                                    required
                                    placeholder="Chọn giờ"
                                />
                            </div>
                            <div className="flex-grow-1 me-2">
                                <InputNumber
                                    inputId="minmax"
                                    value={pitchTime?.price}
                                    onValueChange={(e: InputNumberValueChangeEvent) => setPitchTime({ ...pitchTime, price: e.target.value! })}
                                    min={0}
                                    placeholder='Giá sân'
                                />
                            </div>
                            <div className="flex-shrink-0">
                                <Button icon="pi pi-check" severity="success" onClick={handleSubmit} />
                            </div>
                        </>

                    }
                </div>
            </Dialog>
            <Dialog visible={deletePitchTimeDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePitchTimeDialogFooter} onHide={hideDeletePitchTimeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {timeSlotResponse && (
                        <span>
                            Are you sure you want to delete <b>{timeSlotResponse.time}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
