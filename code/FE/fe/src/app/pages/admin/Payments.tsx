import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MessageModel } from '../../model/MessageModel';
import { createBill, getMessageAll } from '../../service/AdminService';
import { BillModel } from '../../model/BillModel';
import Spinner from '../../comp/Spinner';
import Payment from './components/Payment';
import { STATUS_PITCH_BOOKING_ACCESS, STATUS_PITCH_BOOKING_SUCCESS } from '../../constant/constant';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

export default function Payments() {

    const [messages, setMessages] = useState<MessageModel[]>([]);

    const [btnSubmit, setBtnSubmit] = useState(false);
    const [search, setSearch] = useState<string>()
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState<number>();
    const [totalPages, setTotalPages] = useState<number>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMessageAll(STATUS_PITCH_BOOKING_ACCESS, STATUS_PITCH_BOOKING_SUCCESS, search, first, rows);
                setMessages(result.items);
                setTotalRecords(result.total_items);
                setTotalPages(result.total_pages);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchData();
    }, [btnSubmit]);

    const submitConfirm = async (bill: BillModel) => {
        try {
            await createBill(bill)
            toast.success("Thanh toán thành công");
        } catch (error: any) {
            console.error('Error fetching data', error);
            setHttpError(error.message);
            toast.error("Có lỗi đã xảy ra")
        }
        setBtnSubmit(!btnSubmit);
    }

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const handleSearch = () => {
        const trimmedSearch = search?.trim();
        setFirst(0)
        setSearch(trimmedSearch);
        setBtnSubmit(!btnSubmit);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    if (isLoading) {
        return (
            <div className="progress-spinner text-center">
                <div className="swm-loader"></div>
            </div>
        )
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
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="">Số hóa đơn: {(first + rows) > totalRecords! ? totalRecords : (first + rows)}/{totalRecords}</h3>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <h3>Tìm kiếm theo sân: </h3>
                        <InputText
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            icon="pi pi-search"
                            rounded
                            aria-label="Search"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
                <div className="card-body" style={{ minHeight: '70vh' }}>
                    {
                        messages.length > 0
                            ?
                            <>
                                {
                                    messages.map((message) => (
                                        <Payment message={message} submitConfirm={submitConfirm} key={message.id} />
                                    ))
                                }
                                <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[5, 10, 15]} onPageChange={onPageChange} onClick={() => setBtnSubmit(!btnSubmit)} />
                            </>
                            :
                            <h5 className='text-center'>Không có đơn nào</h5>
                    }
                </div>
            </div>
        </div>
    )
}
