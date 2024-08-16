import React, { useEffect, useState } from 'react'
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { getPitchTypeAll, postEditPitch } from '../../../../service/AdminService';
import { PitchTypeModel } from '../../../../model/PitchTypeModel';
import Spinner from '../../../../comp/Spinner';
import { PitchModel } from '../../../../model/PitchModel';

type Props = {
    pitch: PitchModel;
    setPitch: any;
}

export default function EditPitch(props: Props) {

    const [pitchTypes, setPitchTypes] = useState<PitchTypeModel[]>([]);
    const [pitchType, setPitchType] = useState<PitchTypeModel>();

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPitchTypeAll();
                setPitchTypes(result);
                setIsLoading(false);

            } catch (error: any) {
                setIsLoading(false)
                setHttpError(error.message);
            }
        };

        fetchData();
    }, []);

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
            <div className="mt-4 pt-2">
                <FloatLabel>
                    <InputText id="name" value={props.pitch?.name} onChange={(e) => props.setPitch({ ...props.pitch, name: e.target.value })} style={{ width: '25vw' }} />
                    <label htmlFor="name">Tên sân</label>
                </FloatLabel>
            </div>
            <div className="mt-4 pt-2">
                <FloatLabel>
                    <InputText id="address" value={props.pitch?.address} onChange={(e) => props.setPitch({ ...props.pitch, address: e.target.value })} style={{ width: '25vw' }} />
                    <label htmlFor="address">Địa chỉ sân</label>
                </FloatLabel>
            </div>
            <div className="mt-4 pt-2">
                <FloatLabel>
                    <Dropdown value={pitchType} onChange={(e: DropdownChangeEvent) => { setPitchType(e.value); props.setPitch({ ...props.pitch, pitchTypeId: e.value?.id }) }} options={pitchTypes} optionLabel="name"
                        placeholder="Select a City" style={{ width: '25vw' }} />
                    <label htmlFor="username">Loại sân</label>
                </FloatLabel>
            </div>
        </div>
    )
}
