import React, { useRef, useState } from "react";
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import EditPitch from "./EditPitch";
import { PitchModel } from "../../../../model/PitchModel";
import Spinner from "../../../../comp/Spinner";
import { toast } from "react-toastify";
import { postEditPitch } from "../../../../service/AdminService";

interface Step {
    label: string;
}

type Props = {
    setBtnSubmit: any
}

export default function StepPitch(props: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pitch, setPitch] = useState<PitchModel>();

    const [httpError, setHttpError] = useState(null);

    const submitConfirm = async () => {
        try {
            await postEditPitch(pitch!);
            toast.success("Thông báo đã được gửi đi")
        } catch (error: any) {
            console.error('Error fetching data', error);
            setHttpError(error.message);
            toast.error("Có lỗi đã xảy ra")
        }
        next()
        props.setBtnSubmit(true);
    }

    const steps: Step[] = [
        { label: 'Thông tin sân' },
        { label: 'Giá thuê' },
        { label: 'Ảnh sân' }
    ];

    const next = () => {
        setActiveIndex((prevIndex) => (prevIndex < steps.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const prev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="card p-2 h-100">
            <Steps model={steps} activeIndex={activeIndex} />

            {activeIndex === 0 && (
                <div className="h-100 position-relative">
                    <div className="position-absolute w-100 h-100 d-flex justify-content-center">
                        <EditPitch pitch={pitch!} setPitch={setPitch} />
                    </div>
                    <div className="position-absolute" style={{ bottom: '10px', right: '10px' }}>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={submitConfirm} />
                    </div>
                </div>

            )}

            {activeIndex === 1 && (
                <div className="h-100 position-relative">
                    <div className="position-absolute w-100 h-100">
                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                            Content II
                        </div>
                    </div>
                    <div className="position-absolute" style={{ bottom: '10px', right: '10px' }}>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={next} />
                    </div>
                </div>
            )}

            {activeIndex === 2 && (
                <div className="h-100 position-relative">
                    <div className="position-absolute w-100 h-100">
                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                            Content III
                        </div>
                    </div>
                    <div className="position-absolute" style={{ bottom: '10px', right: '10px' }}>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={next} />
                    </div>
                </div>
            )}
        </div>
    );
}
