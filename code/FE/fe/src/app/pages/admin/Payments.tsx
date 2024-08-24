import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MessageModel } from '../../model/MessageModel';
import { createBill, getMessageAll } from '../../service/AdminService';
import { BillModel } from '../../model/BillModel';
import Spinner from '../../comp/Spinner';
import Payment from './components/Payment';
import { STATUS_PITCH_BOOKING_ACCESS, STATUS_PITCH_BOOKING_SUCCESS } from '../../constant/constant';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

export default function Payments() {

    const [messages, setMessages] = useState<MessageModel[]>([]);

    const [btnSubmit, setBtnSubmit] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState<number>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMessageAll(STATUS_PITCH_BOOKING_ACCESS, STATUS_PITCH_BOOKING_SUCCESS, first, rows);
                setMessages(result.items);
                setTotalRecords(result.total_items);
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

    return (
        <div>
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
                    <h5>Không có đơn nào</h5>
            }
        </div>
    )
}
