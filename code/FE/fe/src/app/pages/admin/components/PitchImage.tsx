import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { deleteImagePitch, getImgByPitchId, postImagePitch } from '../../../service/AdminService';
import { ImagePitch } from '../../../model/ImagePitch';
import defaultAvatar from "../../../../assets/image/avatar.jpg";
import Spinner from '../../../comp/Spinner';

type Props = {
    pitchId: number
}

export default function PitchImage(props: Props) {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imgPitches, setImgPitches] = useState<ImagePitch[]>([]);
    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getImgByPitchId(props.pitchId);
                setImgPitches(result);
                setIsLoading(false);
            } catch (error: any) {
                if (toast.current) {
                    toast.current.show({ severity: 'error', summary: 'Lỗi', detail: error.message });
                }
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchData();
    }, [props.pitchId, btnSubmit]);

    useEffect(() => {
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result as string);
            };
            fileReader.readAsDataURL(image);
        }
    }, [image]);

    const onUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('pitchId', props.pitchId.toString());

            try {
                await postImagePitch(formData);
                if (toast.current) {
                    toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'File Uploaded' });
                }
                setPreviewUrl(null);
                setBtnSubmit(!btnSubmit);
                setIsLoading(false);
            } catch (error: any) {
                if (toast.current) {
                    toast.current.show({ severity: 'error', summary: 'Lỗi', detail: error.message });
                }
                setIsLoading(false);
                setHttpError(error.message);
            }
        }
    };

    const handleDel = async (id: number) => {
        try {
            await deleteImagePitch(id);
            if (toast.current) {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'File Uploaded' });
            }
            setBtnSubmit(!btnSubmit);
            setIsLoading(false);
        } catch (error: any) {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: error.message });
            }
            setIsLoading(false);
            setHttpError(error.message);
        }
    };

    const onSelect = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setImage(selectedFile);
        } else {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Chỉ được chọn ảnh' });
            }
        }
    };



    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (isLoading) {
        return (
            <div className="progress-spinner text-center">
                <div className="swm-loader"></div>
            </div>
        );
    }

    if (httpError) {
        return (
            <div className="card">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <div className="d-flex gap-1 my-1 justify-content-between">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onSelect}
                />
                {previewUrl === null
                    &&
                    <Button
                        icon="pi pi-plus"
                        label="Chọn"
                        className="p-button-primary"
                        onClick={handleButtonClick}
                    />
                }
                {previewUrl && (
                    <div className="my-2">
                        <img src={previewUrl} alt="Preview" style={{ width: 200, height: 200, objectFit: 'cover', border: "1px solid " }} onClick={handleButtonClick} />
                    </div>
                )}
                <div className="">
                    {previewUrl !== null
                        &&
                        <Button label="Tải lên" icon="pi pi-upload" onClick={onUpload} />
                    }
                </div>
            </div>



            <div className="card" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className="m-2">
                    {imgPitches.length === 0
                        ?
                        <div className="text-center my-5">Chưa có ảnh nào</div>
                        :
                        imgPitches.map(img => (
                            <div key={img.id} className="m-2" style={{ position: 'relative', display: 'inline-block', width: 200 }}>
                                <img
                                    src={process.env.REACT_APP_API_URL + `/image/${img.name}`}
                                    alt="Pitch"
                                    width={200}
                                    height={200}
                                    onError={(e) => {
                                        e.currentTarget.src = defaultAvatar;
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '1px 6px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                    }}
                                    onClick={() => handleDel(img.id!)}
                                >
                                    x
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
