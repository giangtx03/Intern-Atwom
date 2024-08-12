import React, { Suspense, useState } from 'react'

import Spinner from '../../comp/Spinner';
import { AdminRouter } from '../../routers/admin/AdminRouter';
import { Navigate, useRoutes } from 'react-router-dom';
import { spinner } from '../../../App';
import MessageBooks from '../../pages/admin/components/MessageBooks';
import Payments from '../../pages/admin/components/Payments';

export default function AdminPage() {


    let router = useRoutes([
        { path: 'admin', element: <Navigate to="/messagebooks" replace /> },
        { path: 'admin/messagebooks', element: <MessageBooks /> },
        { path: 'admin/payments', element: <Payments /> },
        { path: 'admin/dashboard', element: <Spinner /> },
        { path: 'admin/editPitch', element: <Spinner /> },
    ]);

    return (
        <div>
            <Suspense fallback={spinner}>{router}</Suspense>
        </div>
    );

    // return (
    //     <div className=""></div>
    // )
}


