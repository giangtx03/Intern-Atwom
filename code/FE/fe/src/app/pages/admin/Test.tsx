
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
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { EditPitchModel } from '../../model/EditPitchModel';
import { getEditPitch } from '../../service/AdminService';
import { PitchModel } from '../../model/PitchModel';

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
        id: 0,
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

    const formatCurrency = (value: number) => {
        // return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setPitch(emptyPitch);
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

    const savePitch = () => {
        setSubmitted(true);

        if (pitch.name?.trim()) {
            let _pitches = [...pitches];
            let _pitch = { ...pitch };

            if (pitch.id) {
                const index = findIndexById(pitch.id);

                _pitches[index] = _pitch;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _pitches.push(_pitch);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setPitches(_pitches);
            setPitchDialog(false);
            setPitch(emptyPitch);
        }
    };

    const editProduct = (pitch: PitchModel) => {
        setPitch({ ...pitch });
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

    // const createId = (): string => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }

    //     return id;
    // };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePitchesDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _pitches = pitches.filter((val) => !selectedPitches.includes(val));

        setPitches(_pitches);
        setDeletePitchesDialog(false);
        setSelectedPitches([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _pitch = { ...pitch };

        _pitch['pitchTypeId'] = e.value;
        setPitch(_pitch);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _pitch = { ...pitch };

        // @ts-ignore
        _pitch[name] = val;

        setPitch(_pitch);
    };

    const onInputTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
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

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPitches || !selectedPitches.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData: Product) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData: Product) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData: Product) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData: Product) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData: PitchModel) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
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
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

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
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={pitchDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {/* {pitch.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />} */}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={pitch.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !pitch.name })} />
                    {submitted && !pitch.name && <small className="p-error">Name is required.</small>}
                </div>
                {/* <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onInputTextAreaChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div> */}
                    </div>
                </div>

                <div className="formgrid grid">
                    {/* <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div> */}
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
