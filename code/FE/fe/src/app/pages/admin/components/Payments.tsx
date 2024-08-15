import React, { useEffect, useState } from 'react'
import Payment from './Payment'
import { MessageModel } from '../../../model/MessageModel';
import { createBill, getMessageAll } from '../../../service/AdminService';
import { toast } from 'react-toastify';
import { BillModel } from '../../../model/BillModel';
import Spinner from '../../../comp/Spinner';

export default function Payments() {

    const [messages, setMessages] = useState<MessageModel[]>([]);

    const [btnSubmit, setBtnSubmit] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMessageAll("chưa thanh toán", "đã thanh toán");
                setMessages(result);
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
                    messages.map((message) => (
                        <Payment message={message} submitConfirm={submitConfirm} key={message.id} />
                    ))
                    :
                    <h5>Không có đơn nào</h5>
            }
        </div>
    )
}
