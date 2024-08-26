
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { EditPitchModel } from '../../model/EditPitchModel';
import { delEditPitch, getEditPitch, getPitchTypeAll, postEditPitch, putEditPitch } from '../../service/AdminService';
import { PitchModel } from '../../model/PitchModel';
import { PitchTypeModel } from '../../model/PitchTypeModel';
import PitchTimeTable from './components/PitchTimeTable';
import PitchImage from './components/PitchImage';
import Spinner from '../../comp/Spinner';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

interface Pitch {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    price: number;
    category: string | null;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

export default function EditPitches() {

    let emptyPitch: PitchModel = {
        id: undefined,
        name: '',
        address: '',
        pitchTypeId: 0,
    };

    const [pitches, setPitches] = useState<EditPitchModel[]>([]);
    const [pitchDialog, setPitchDialog] = useState<boolean>(false);
    const [deletePitchDialog, setDeletePitchDialog] = useState<boolean>(false);
    const [visibleTime, setVisibleTime] = useState<boolean>(false);
    const [visibleImg, setVisibleImg] = useState<boolean>(false);
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
    const [pitch, setPitch] = useState<PitchModel>(emptyPitch);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [pitchTypes, setPitchTypes] = useState<PitchTypeModel[]>([]);
    const [pitchType, setPitchType] = useState<PitchTypeModel>();
    const [pitchId, setPitchId] = useState<number>();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState<number>();
    const [totalPages, setTotalPages] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<EditPitchModel[]>>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getEditPitch(first, rows);
                setPitches(result.items);
                setTotalRecords(result.total_items);
                setTotalPages(result.total_pages);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
            }
        };

        fetchData();
    }, [btnSubmit, visibleTime, visibleImg]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPitchTypeAll();
                setPitchTypes(result);
                setIsLoading(false);

            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
            }
        };

        fetchData();
    }, []);

    const openNew = () => {
        setPitch(emptyPitch);
        setPitchType({ ...pitchType, id: emptyPitch.pitchTypeId });
        setSubmitted(false);
        setPitchDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPitchDialog(false);
    };

    const hideDeletePitchDialog = () => {
        setDeletePitchDialog(false);
    };

    const savePitch = async () => {
        setSubmitted(true);

        // Validation
        if (!pitch.name?.trim() || !pitch.address?.trim() || !pitch.pitchTypeId) {
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Tất cả thông tin phải được điền.', life: 3000 });
            return;
        }

        let _pitch = { ...pitch };


        if (pitch.id) {

            try {
                setSubmitted(false);
                await putEditPitch(_pitch);
                toast.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Sân đã được cập nhật', life: 3000 });
            } catch (error: any) {
                console.error('Đã có lỗi xảy ra', error);
            }

        } else {
            try {
                setSubmitted(false);
                await postEditPitch(_pitch);
                toast.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Sân đã được tạo', life: 3000 });
            } catch (error: any) {
                console.error('Đã có lỗi xảy ra', error);
            }
        }
        setBtnSubmit(!btnSubmit);
        setPitchDialog(false);
        setPitch(emptyPitch);

    };

    const editPitch = (temp: EditPitchModel) => {
        const foundType = pitchTypes.find(e => e.name === temp.type);
        if (foundType) {
            setPitchType({ ...pitchType, id: foundType.id, name: foundType.name });
            setPitch({ ...pitch, id: temp.id, name: temp.name, address: temp.address, pitchTypeId: foundType.id });
        } else {
            console.error("Pitch type not found");
        }
        setPitchDialog(true);
    };

    const confirmDeletePitch = (temp: EditPitchModel) => {
        const foundType = pitchTypes.find(e => e.name === temp.type);
        if (foundType) {
            setPitchType({ ...pitchType, id: foundType.id, name: foundType.name });
            setPitch({ ...pitch, id: temp.id, name: temp.name, address: temp.address, pitchTypeId: foundType.id });
        } else {
            console.error("Pitch type not found");
        }
        setDeletePitchDialog(true);
    };

    const deletePitch = async () => {
        let _pitch = { ...pitch }

        try {
            await delEditPitch(_pitch.id!);
            setFirst(0);
            toast.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Sân đã được xóa', life: 3000 });
        } catch (error: any) {
            console.error('Error fetching data', error);
        }

        setBtnSubmit(!btnSubmit);
        setDeletePitchDialog(false);
        setPitch(emptyPitch);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _pitch = { ...pitch };

        // @ts-ignore
        _pitch[name] = val;

        setPitch(_pitch);
    };

    const onDropdownChange = (e: DropdownChangeEvent, name: string) => {
        const val = e.value.id ?? 0;
        let _pitch = { ...pitch };

        // @ts-ignore
        _pitch[name] = val;

        setPitch(_pitch);
    };

    const actionBodyTemplate = (rowData: EditPitchModel) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="me-2" onClick={() => editPitch(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePitch(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <h3 className="m-0">Quản lý sân</h3>
            <Button label="Thêm" icon="pi pi-plus" severity="success" onClick={openNew} />
        </div>
    );
    const pitchDialogFooter = (
        <React.Fragment>
            <Button className='me-2' label="Hủy" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Lưu" icon="pi pi-check" onClick={savePitch} />
        </React.Fragment>
    );
    const deletePitchDialogFooter = (
        <React.Fragment>
            <Button className='me-2' label="Không" icon="pi pi-times" outlined onClick={hideDeletePitchDialog} />
            <Button label="Có" icon="pi pi-check" severity="danger" onClick={deletePitch} />
        </React.Fragment>
    );
    const handleClickTime = (rowData: any) => {
        setPitchId(rowData.id);
        setVisibleTime(true);
    };

    const handleClickImg = (rowData: any) => {
        setPitchId(rowData.id);
        setVisibleImg(true);
    };

    const handleDate = (date: any) => {
        if (typeof date === 'string') {
            date = date.substring(0, date.length - 3).replace("T", " ");
        } else {
            console.error('Date is not a string:', date);
        }
        return date;
    }

    const createAt = (rowData: any) => {
        return (
            <div>
                {handleDate(rowData.createAt)}
            </div>
        );
    };

    const updateAt = (rowData: any) => {
        return (
            <div>
                {handleDate(rowData.updateAt)}
            </div>
        );
    };

    const sumTime = (rowData: any) => {
        return (
            <div className='text-center pt-2' onClick={() => handleClickTime(rowData)} style={{ height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer', background: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
                {rowData.sumTime}
            </div>
        );
    };

    const sumImg = (rowData: any) => {
        return (
            <div className='text-center pt-2' onClick={() => handleClickImg(rowData)} style={{ height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer', background: 'var(--primary-color)', color: 'var(--primary-color-text)' }}>
                {rowData.sumImg}
            </div>
        );
    };

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

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
        <div>
            <Toast ref={toast} />
            <div className="card">
                <DataTable ref={dt} value={pitches}
                    dataKey="id" header={header}
                    selectionMode="single"
                >
                    <Column field="id" header="Id" sortable style={{ minWidth: '' }}></Column>
                    <Column field="name" header="Tên" style={{ minWidth: '7rem' }}></Column>
                    <Column field="address" header="Địa chỉ" style={{ minWidth: '12rem' }}></Column>
                    <Column field="createAt" header="Ngày tạo" sortable style={{ minWidth: '10rem' }} body={createAt}></Column>
                    <Column field="updateAt" header="Ngày sửa" sortable style={{ minWidth: '10rem' }} body={updateAt}></Column>
                    <Column field="type" header="Loại sân" style={{ minWidth: '8rem' }}></Column>
                    <Column field="sumTime" header="Tổng giờ" style={{ minWidth: '5rem' }} body={sumTime}></Column>
                    <Column field="sumImg" header="Tổng ảnh" style={{ minWidth: '5rem' }} body={sumImg}></Column>
                    <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
                {totalPages! > 1 && < Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} onClick={() => setBtnSubmit(!btnSubmit)} />}
            </div>

            <Dialog visible={pitchDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Thông tin sân" modal className="p-fluid" footer={pitchDialogFooter} onHide={hideDialog}>
                <div className="field mb-3">
                    <label htmlFor="name" className="font-bold">
                        Tên sân
                    </label>
                    <InputText id="name" value={pitch.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !pitch.name })} />
                    {submitted && !pitch.name && <small className="p-error">Tên sân không được để trống.</small>}
                </div>
                <div className="field mb-3">
                    <label htmlFor="address" className="font-bold">
                        Địa chỉ
                    </label>
                    <InputText id="address" value={pitch.address} onChange={(e) => onInputChange(e, 'address')} required autoFocus className={classNames({ 'p-invalid': submitted && !pitch.address })} />
                    {submitted && !pitch.address && <small className="p-error">Địa chỉ không được để trống.</small>}
                </div>

                <div className="field">
                    <label htmlFor="pitchTypeId">Loại sân</label>
                    <Dropdown value={pitchTypes.find(e => e.id === pitch.pitchTypeId)} onChange={(e) => onDropdownChange(e, 'pitchTypeId')} options={pitchTypes} optionLabel="name" placeholder="Chọn loại sân" className={classNames({ 'p-invalid': submitted && !pitch.pitchTypeId })} />
                    {submitted && !pitch.pitchTypeId && <small className="p-error">Vui lòng chọn loại sân.</small>}
                </div>
            </Dialog>

            <Dialog visible={deletePitchDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Xác nhận" modal footer={deletePitchDialogFooter} onHide={hideDeletePitchDialog}>
                <div className="d-flex align-items-center">
                    <i className="pi pi-exclamation-triangle me-3" style={{ fontSize: '2rem' }} />
                    {pitch && (
                        <span>
                            Bạn có chắc muốn xóa <b>{pitch.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog header="Các giờ hoạt động" visible={visibleTime} style={{ width: '50vw' }} onHide={() => { if (!visibleTime) return; setVisibleTime(false); }}>
                <PitchTimeTable pitchId={pitchId!} />
            </Dialog>
            <Dialog header="Ảnh sân" visible={visibleImg} style={{ width: '50vw' }} onHide={() => { if (!visibleImg) return; setVisibleImg(false); }}>
                <PitchImage pitchId={pitchId!} />
            </Dialog>
        </div>
    );
}
