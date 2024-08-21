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
    const [imgPitches, setImgPitches] = useState<ImagePitch[]>([])
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getImgByPitchId(props.pitchId);
                setImgPitches(result);
                // setIsLoading(false);
            } catch (error: any) {
                // setIsLoading(false);
                // setHttpError(error.message);
            }
        };

        fetchData();
    }, []);

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
        const selectedFile = e.files[0];
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

        }
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <div className="d-flex gap-1 my-1">
                <FileUpload
                    mode="basic"
                    name="demo"
                    accept="image/*"
                    maxFileSize={1000000}
                    customUpload
                    auto={false}
                    onSelect={onSelect}
                    chooseLabel="Choose"
                />
                <Button label="Upload" icon="pi pi-upload" onClick={onUpload} />
            </div>
            <div className="card" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className="m-2">
                    {/* You can display image preview or other details here */}
                    {imgPitches.map(img => (
                        <div className="m-2" style={{ position: 'relative', display: 'inline-block', width: 200 }}>
                            <img
                                src={`http://localhost:8080/public/api/v1/image/${img.name}`}
                                alt="User Avatar"
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
                    ))}
                </div>
            </div>
        </div>
    );
}
