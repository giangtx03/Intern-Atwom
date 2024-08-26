import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MessageModel } from '../../../model/MessageModel';
import { Dialog } from 'primereact/dialog';
import { STATUS_PITCH_BOOKING_ACCESS, STATUS_PITCH_BOOKING_REJECT, STATUS_PITCH_BOOKING_SUCCESS } from '../../../constant/constant';

type Props = {
    message: MessageModel;
    submitConfirm: any;
}

export default function MessageBook(props: Props) {

    // dialog
    const [visible, setVisible] = useState(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    const submitBtn = (value: string) => {
        if (props.message !== null) {
            props.submitConfirm(props.message.id, value);
        }
    }

    const handleDate = (date: any) => {
        if (typeof date === 'string') {
            date = date.substring(0, date.length - 3).replace("T", " ");
        } else {
            console.error('Date is not a string:', date);
        }
        return date;
    }

    const footerContent = (
        <div>
            <Button className="p-button-text rounded-2" label="Không" icon="pi pi-times" onClick={() => setVisible(false)} />
            <Button className="rounded-2" label="Có" icon="pi pi-check" onClick={() => {
                if (currentAction) {
                    submitBtn(currentAction);
                }
                setVisible(false);
            }} autoFocus />
        </div>
    );

    const footer = (
        <>
            <Button className='rounded-2' label="Chấp nhận" icon="pi pi-check" onClick={() => {
                setCurrentAction(STATUS_PITCH_BOOKING_ACCESS);
                setVisible(true);
            }} />
            <Button className='rounded-2' label="Từ chối" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={() => {
                setCurrentAction(STATUS_PITCH_BOOKING_REJECT);
                setVisible(true);
            }} />
        </>
    );

    return (
        <div className="card mt-2">
            <Card title="Đặt sân" subTitle={() => handleDate(props.message.createAt)} footer={footer} className="">

                <div className="row">
                    <div className="col-6">
                        <div className="">
                            <b>Tên người đặt: </b>
                            {props.message.fullname}
                        </div>
                        <div className="">
                            <b>SĐT: </b>
                            {props.message.phoneNumber}
                        </div>
                        <div className="">
                            <b>Email: </b>
                            {props.message.email}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="">
                            <b>Đặt sân: </b>
                            {props.message.namePitch}
                        </div>
                        <div className="">
                            <b>Địa chỉ: </b>
                            {props.message.address}
                        </div>
                        <div className="">
                            <b>Vào lúc: </b>
                            {handleDate(props.message.startTime)} - {handleDate(props.message.endTime)}
                        </div>
                    </div>
                </div>
                <br />
                <div className=""><b><u>Ghi chú:</u></b> {props.message.note}</div>
            </Card>

            <Dialog header="Xác nhận" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0">Bạn có chắc chắn muốn <b>{currentAction === STATUS_PITCH_BOOKING_ACCESS ? "chấp nhận" : "từ chối"}</b> đơn này?</p>
            </Dialog>
        </div>
    )
}
