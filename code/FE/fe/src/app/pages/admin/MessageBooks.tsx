import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getMessageAll, updateStatus } from '../../service/AdminService';
import { MessageModel } from '../../model/MessageModel';
import MessageBook from './components/MessageBook';
import { STATUS_PITCH_BOOKING_WAIT } from '../../constant/constant';

export default function MessageBooks() {

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>();

    const [btnSubmit, setBtnSubmit] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMessageAll(STATUS_PITCH_BOOKING_WAIT);
                setMessages(result.items);
                setTotalRecords(result.total_items);
                setIsLoading(false);

            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [btnSubmit]);

    const submitConfirm = async (id: number, status: string) => {
        const statusObj = { id: id, status: status }
        try {
            setIsLoading(true);
            await updateStatus(statusObj);
            toast.success("Thông báo đã được gửi đi")
        } catch (error: any) {
            console.error('Error fetching data', error);
            setHttpError(error.message);
            toast.error("Có lỗi đã xảy ra")
        }
        setBtnSubmit(!btnSubmit);
    }


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
        <div className="">
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '1rem' }}>
                <h3>Số sân cần duyệt: {totalRecords}</h3>
            </div>
            {messages.length > 0
                &&
                messages.map((message) => (
                    <MessageBook message={message} submitConfirm={submitConfirm} key={message.id} />
                ))}
        </div>
    )
}
