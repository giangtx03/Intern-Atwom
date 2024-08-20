import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { postImagePitch } from '../../../service/AdminService';
import { ImagePitch } from '../../../model/ImagePitch';

export default function PitchImage() {
    const [image, setImage] = useState<File | null>(null);
    const toast = useRef<Toast>(null);

    const onUpload = async () => {
        if (image) {
            // try {
            //     const result = await postImagePitch(image);
            //     console.log(result);
            //     if (toast.current) {
            //         toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
            //     }
            // } catch (error: any) {
            //     if (toast.current) {
            //         toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
            //     }
            // }
        }
    };

    const onSelect = (e: any) => {
        setImage(e.files[0]);
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
                </div>
            </div>
        </div>
    );
}
