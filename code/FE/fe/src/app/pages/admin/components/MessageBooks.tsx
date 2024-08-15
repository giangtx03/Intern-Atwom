import React, { useEffect, useState } from 'react'
import MessageBook from './MessageBook'
import { MessageModel } from '../../../model/MessageModel';
import { getMessageAll, updateStatus } from '../../../service/AdminService';
import { toast } from 'react-toastify';
import Spinner from '../../../comp/Spinner';

export default function MessageBooks() {

    const [messages, setMessages] = useState<MessageModel[]>([]);

    const [btnSubmit, setBtnSubmit] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMessageAll("chờ");
                setMessages(result);
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
        <div className="">
            <div style={{ maxHeight: '640px', overflowY: "auto" }}>
                {
                    messages.length > 0
                        ?
                        messages.map((message) => (
                            <MessageBook message={message} submitConfirm={submitConfirm} key={message.id} />
                        ))
                        :
                        <h3 className='text-center'>Không có đơn nào</h3>
                }
            </div>
        </div>
    )
}
