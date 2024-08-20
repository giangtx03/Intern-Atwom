import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { postImagePitch } from '../../../service/AdminService';
import { ImagePitch } from '../../../model/ImagePitch';

type Props = {
    pitchId: number
}

export default function PitchImage(props: Props) {
    const [image, setImage] = useState<File | null>(null);
    const toast = useRef<Toast>(null);

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

    return (
        <div>
            <Toast ref={toast}></Toast>
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
            <div className="card" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div className="m-2">
                    {/* You can display image preview or other details here */}
                    <img
                        src={`http://localhost:8080/public/api/v1/image/389649f8-7690-419b-8745-5fcbb79b8bf8.png`}
                        alt="User Avatar"
                        width="250"
                    />
                    <img
                        src={`http://localhost:8080/public/api/v1/image/389649f8-7690-419b-8745-5fcbb79b8bf8.png`}
                        alt="User Avatar"
                        width="250"
                    />
                    <img
                        src={`http://localhost:8080/public/api/v1/image/389649f8-7690-419b-8745-5fcbb79b8bf8.png`}
                        alt="User Avatar"
                        width="250"
                    />
                </div>
            </div>
        </div>
    );
}
