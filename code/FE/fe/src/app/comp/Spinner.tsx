import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Spinner() {
    return (
        <div className="container-fluid" >
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        </div>
    );
}