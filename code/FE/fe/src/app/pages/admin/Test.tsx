
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { EditPitchModel } from '../../model/EditPitchModel';
import { getEditPitch, getPitchTypeAll, postEditPitch, putEditPitch } from '../../service/AdminService';
import { PitchModel } from '../../model/PitchModel';
import { PitchTypeModel } from '../../model/PitchTypeModel';

interface Product {
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

export default function Test() {

    let emptyPitch: PitchModel = {
        id: undefined,
        name: '',
        address: '',
        pitchTypeId: 0,
    };

    // const [products, setProducts] = useState<Product[]>([]);
    const [pitches, setPitches] = useState<EditPitchModel[]>([]);
    const [pitchDialog, setPitchDialog] = useState<boolean>(false);
    const [deletePitchDialog, setDeletePitchDialog] = useState<boolean>(false);
    const [deletePitchesDialog, setDeletePitchesDialog] = useState<boolean>(false);
    const [pitch, setPitch] = useState<PitchModel>(emptyPitch);
    const [selectedPitches, setSelectedPitches] = useState<EditPitchModel[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [pitchTypes, setPitchTypes] = useState<PitchTypeModel[]>([]);
    const [pitchType, setPitchType] = useState<PitchTypeModel>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<EditPitchModel[]>>(null);

    useEffect(() => {
        // ProductService.getProducts().then((data) => setProducts(data));
        const fetchData = async () => {
            try {
                const result = await getEditPitch();
                setPitches(result);
                // setIsLoading(false);
                // setBtnSubmit(false);
            } catch (error: any) {
                // setIsLoading(false)
                // setHttpError(error.message);
                // setBtnSubmit(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPitchTypeAll();
                setPitchTypes(result);
                // setIsLoading(false);

            } catch (error: any) {
                // setIsLoading(false)
                // setHttpError(error.message);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (value: number) => {
        // return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

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

    const hideDeletePitchesDialog = () => {
        setDeletePitchesDialog(false);
    };

    const savePitch = async () => {
        setSubmitted(true);

        if (pitch.name?.trim()) {
            let _pitches = [...pitches];
            let _pitch = { ...pitch };

            console.log("_pitch", _pitch);

            if (pitch.id) {

                try {
                    await putEditPitch(_pitch);
                    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } catch (error: any) {
                    console.error('Error fetching data', error);
                }

            } else {
                try {
                    await postEditPitch(_pitch);
                    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                } catch (error: any) {
                    console.error('Error fetching data', error);
                }
            }

            setPitches(_pitches);
            setPitchDialog(false);
            setPitch(emptyPitch);
        }
    };

    const editProduct = (temp: EditPitchModel) => {
        const foundType = pitchTypes.find(e => e.name === temp.type);
        if (foundType) {
            setPitchType({ ...pitchType, id: foundType.id, name: foundType.name });
            setPitch({ ...pitch, id: temp.id, name: temp.name, address: temp.address, pitchTypeId: foundType.id });
        } else {
            console.error("Pitch type not found");
        }
        setPitchDialog(true);
    };

    const confirmDeleteProduct = (pitch: PitchModel) => {
        setPitch(pitch);
        setDeletePitchDialog(true);
    };

    const deleteProduct = () => {
        let _pitches = pitches.filter((val) => val.id !== pitch.id);

        setPitches(_pitches);
        setDeletePitchDialog(false);
        setPitch(emptyPitch);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id: number) => {
        let index = -1;

        for (let i = 0; i < pitches.length; i++) {
            if (pitches[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const confirmDeleteSelected = () => {
        setDeletePitchesDialog(true);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _pitch = { ...pitch };

        // @ts-ignore
        _pitch[name] = val;

        setPitch(_pitch);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value ?? 0;
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

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPitches || !selectedPitches.length} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData: Product) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData: Product) => {
        return formatCurrency(rowData.price);
    };


    const actionBodyTemplate = (rowData: EditPitchModel) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Pitches</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Search..." onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={savePitch} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePitchDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePitchesDialog} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable ref={dt} value={pitches} selection={selectedPitches}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedPitches(e.value);
                        }
                    }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}
                    selectionMode="multiple"
                >
                    <Column field="id" header="Id" sortable style={{ minWidth: '' }}></Column>
                    <Column field="name" header="Tên" sortable style={{ minWidth: '7rem' }}></Column>
                    <Column field="address" header="Địa chỉ" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="createAt" header="Ngày tạo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="updateAt" header="Ngày sửa" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="type" header="Loại sân" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="sumTime" header="Tổng giờ" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="sumImg" header="Tổng ảnh" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={pitchDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field mb-3">
                    <label htmlFor="name" className="font-bold">
                        Tên sân
                    </label>
                    <InputText id="name" value={pitch.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !pitch.name })} />
                    {submitted && !pitch.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field mb-3">
                    <label htmlFor="address" className="font-bold">
                        Địa chỉ
                    </label>
                    <InputText id="address" value={pitch.address} onChange={(e) => onInputChange(e, 'address')} required autoFocus className={classNames({ 'p-invalid': submitted && !pitch.address })} />
                    {submitted && !pitch.address && <small className="p-error">Địa chỉ is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="type">Loại sân</label>
                    <Dropdown id="type" value={pitchType} onChange={(e) => { setPitchType(e.value); onDropdownChange(e, 'pitchTypeId') }} options={pitchTypes} optionLabel="name" required
                        placeholder="Chọn loại sân" />
                </div>
            </Dialog>

            <Dialog visible={deletePitchDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeletePitchDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {pitch && (
                        <span>
                            Are you sure you want to delete <b>{pitch.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deletePitchesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeletePitchesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {pitch && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
