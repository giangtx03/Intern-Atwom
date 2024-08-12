import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';

export default function LayoutNavbar() {

    const navigate = useNavigate();

    const redirect = (url: string) => {
        navigate(url)
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-3">
                    <Button label="button" onClick={() => redirect("messagebooks")} />
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
