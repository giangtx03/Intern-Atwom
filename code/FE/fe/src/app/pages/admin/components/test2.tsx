import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { postImagePitch } from '../../../service/AdminService';
import { ImagePitch } from '../../../model/ImagePitch';

export default function PitchImage() {
    const [image, setImage] = useState<ImagePitch | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    const onSelect = (e: any) => {
        const file = e.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onUpload = async () => {
        if (!image) return;

        // try {
        //     const result = await postImagePitch(image);
        //     console.log(result);
        //     if (toast.current) {
        //         toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        //     }
        // } catch (error: any) {
        //     // Handle error
        //     console.error(error);
        // }
    };

    const clearImage = () => {
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="">
            <Toast ref={toast}></Toast>
            <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={1000000}
                onSelect={onSelect}
                auto
                chooseLabel="Choose"
            />
            <Button label="Upload" onClick={onUpload} />

            {preview && (
                <div className="card" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <div className="m-2" style={{ position: 'relative', display: 'inline-block', width: 100 }}>
                        <img src={preview} width="100" height="100" alt="pitch" />
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
                            onClick={clearImage}
                        >
                            x
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

{/* <div className="m-2" style={{ position: 'relative', display: 'inline-block', width: 100 }}>
                        <img
                            src={require('../../../../assets/image/avatar.jpg')}
                            width="100"
                            height="100"
                            alt="pitch"
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
                        >
                            x
                        </span>
                    </div> */}
