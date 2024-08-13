import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './comp/Sidebar'
import Header from './comp/Header'

export default function Layout() {
    return (
        <div className='d-flex'>
            <div className={false ? "col-2" : ""}>
                {false && <Sidebar/>}
            </div>
            <div className={false ? 'col-10' : "col-12"}>
                <Header/>
                <Outlet/>
            </div>
        </div>
    )
}