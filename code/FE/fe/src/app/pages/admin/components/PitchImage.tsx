import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { deleteImagePitch, getImgByPitchId, postImagePitch } from '../../../service/AdminService';
import { ImagePitch } from '../../../model/ImagePitch';
import defaultAvatar from "../../../../assets/image/avatar.jpg";

type Props = {
    pitchId: number
}

export default function PitchImage(props: Props) {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imgPitches, setImgPitches] = useState<ImagePitch[]>([]);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getImgByPitchId(props.pitchId);
                setImgPitches(result);
            } catch (error: any) {
                if (toast.current) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                }
            }
        };

        fetchData();
    }, [props.pitchId]);

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
                const result = await postImagePitch(formData);
                console.log(result);
                if (toast.current) {
                    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
                }
            } catch (error: any) {
                if (toast.current) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                }
            }
        }
    };

    const onSelect = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setImage(selectedFile);
        } else {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Only image files are allowed' });
            }
        }
    };

    const handleDel = async (id: number) => {
        try {
            const result = await deleteImagePitch(id);
            console.log(result)
        } catch (error: any) {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            }
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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
                        icon="pi pi-upload"
                        label="Choose"
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
                    <Button label="Upload" icon="pi pi-upload" onClick={onUpload} />
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
                                    src={`http://localhost:8080/public/api/v1/image/${img.name}`}
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



{/* <FileUpload
mode="basic"
name="demo"
accept="image/*"
maxFileSize={1000000}
customUpload
auto={false}
onSelect={onSelect}
chooseLabel="Choose"
/> */}