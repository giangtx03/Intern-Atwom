import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './comp/Sidebar'
import Header from './comp/Header'

export default function Layout() {
    return (
        <div className='d-flex'>
            <div className='col-2'>
                <Sidebar/>
            </div>
            <div className='col-10'>
                <Header/>
                <Outlet/>
            </div>
        </div>
    )
}