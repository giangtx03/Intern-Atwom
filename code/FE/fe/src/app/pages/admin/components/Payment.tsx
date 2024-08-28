import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MessageModel } from '../../../model/MessageModel';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { FloatLabel } from "primereact/floatlabel";
import { BillModel } from '../../../model/BillModel';
import { STATUS_PITCH_BOOKING_ACCESS } from '../../../constant/constant';

type Props = {
    message: MessageModel;
    submitConfirm: any;
}

export default function Payment(props: Props) {


    const [bill, setBill] = useState<BillModel>()

    // dialog
    const [visible, setVisible] = useState(false);

    const currentDateTime = useRef(new Date());


    const handleDate = (date: any) => {
        if (typeof date === 'string') {
            date = date.substring(0, date.length - 3).replace("T", " ");
        } else {
            console.error('Date is not a string:', date);
        }
        return date;
    }

    const submitBtn = () => {
        const newBill: BillModel = {
            ...bill,
            pitchBookingId: props.message.id
        };
        console.log(newBill)
        setBill(newBill);
        if (props.message !== null) {
            props.submitConfirm(newBill);
        }
    }

    const handleDateTime: string = currentDateTime.current.toLocaleDateString('en-CA') + " " + currentDateTime.current.toLocaleTimeString();


    const headerDialog = (
        <div className="">
            <div className="">Hóa đơn</div>
            <div className="text-secondary fs-6 fw-lighter">{handleDate(handleDateTime)}</div>
        </div>
    )

    const footerDialog = (
        <div>
            <Button className="rounded-2 w-100" label="Xác nhận thanh toán" icon="pi pi-check" onClick={() => { setVisible(false); submitBtn() }} />
        </div>
    );

    const header = (
        <div className="d-flex justify-content-between me-5">
            <div>{props.message.namePitch}</div>
            <div className="">{handleDate(props.message.startTime)} - {handleDate(props.message.endTime)}</div>
        </div>
    );

    const subtitle = (
        <div className={props.message.statusBook === STATUS_PITCH_BOOKING_ACCESS ? "text-danger" : "text-success"}>
            {props.message.statusBook === STATUS_PITCH_BOOKING_ACCESS ? "Chưa thanh toán" : `Đã thanh toán (${handleDate(props.message.createBill)})`}
            <hr />
        </div>
    )

    return (
        <div className="card mt-2">
            <Card title={header} subTitle={subtitle}>
                <div className="d-flex justify-content-between align-items-center mx-5">
                    <div className="row flex-grow-1">
                        <div className="col-4">
                            <div className="">
                                <b>Tên người đặt: </b>
                                {props.message.fullname}
                            </div>
                            <div className="">
                                <b>SĐT: </b>
                                {props.message.phoneNumber}
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="">
                                <b>Ngày: </b>
                                {handleDate(props.message.createAt)}
                            </div>
                            <div className="">
                                <b>Địa chỉ sân: </b>
                                {props.message.address}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {
                            props.message.statusBook !== STATUS_PITCH_BOOKING_ACCESS
                                ?
                                <div style={{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '1rem', fontWeight: 700 }}>
                                    {props.message.price?.toLocaleString()} VND
                                </div>
                                :
                                <Button label="Thanh toán" icon="pi pi-credit-card" className='rounded-2' onClick={() => { setVisible(true); currentDateTime.current = new Date(); }} />
                        }
                    </div>
                </div>
                <br />
                <div className=""><b><u>Ghi chú đặt sân:</u></b> {props.message.note}</div>
                {props.message.createBill !== null && <div className=""><b><u>Ghi chú thanh toán:</u></b> {props.message.noteBill}</div>}
            </Card >

            <Dialog header={headerDialog} visible={visible} style={{}} onHide={() => setVisible(false)} footer={footerDialog}>
                <div className="d-flex">
                    <div className="me-3">
                        <div className="mb-1"><b>Họ và tên: </b></div>
                        <div className="mb-3"><b>SĐT: </b></div>
                        <div className="mb-1"><b>Sân: </b></div>
                        <div className="mb-1"><b>Địa chỉ: </b></div>
                        <div className="mb-1"><b>Lúc: </b></div>
                    </div>
                    <div className="">
                        <div className="mb-1">{props.message.fullname}</div>
                        <div className="mb-3">{props.message.phoneNumber}</div>
                        <div className="mb-1">{props.message.namePitch}</div>
                        <div className="mb-1">{props.message.address}</div>
                        <div className="mb-1">{handleDate(props.message.startTime)} - {handleDate(props.message.endTime)}</div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                    <div className=""><b>Tổng tiền:</b></div>
                    <div className="">{props.message.price?.toLocaleString()} VND</div>
                </div>
                <div className="card flex justify-content-center">
                    <InputTextarea autoResize value={bill?.note} onChange={(e) => setBill({ ...bill, note: e.target.value })} rows={2} cols={30} placeholder='Ghi chú' />
                </div>
            </Dialog>
        </div >

    )
}
