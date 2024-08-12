import React, { useState } from 'react'

import MessageBooks from './components/MessageBooks';
import Payments from './components/Payments';
import { AdminRouter } from '../../routers/admin/AdminRouter';
import LayoutNavbar from './Layout/LayoutNavbar';
import { useRoutes } from 'react-router-dom';
import Spinner from '../../comp/Spinner';

export default function AdminPage() {


    // let router = useRoutes([
    //     { path: 'messagebooks', element: <MessageBooks /> },
    //     { path: 'payments', element: <Payments /> },
    //     { path: 'dashboard', element: <Spinner /> },
    //     { path: 'editPitch', element: <Spinner /> },
    // ]);

    // return <div>{router}</div>;

    return (
        <div className="">aaaaaaaaaaaa</div>
    )
}

// return (
//     <div className="flex-grow-1 m-3">
//         <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//             <Row>
//                 <Col sm={2}>
//                     <Nav variant="pills" className="flex-column">
//                         <Nav.Item>
//                             <Nav.Link eventKey="first">Tab 1</Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="payment">Payment</Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="message">Message</Nav.Link>
//                         </Nav.Item>
//                     </Nav>
//                 </Col>
//                 <Col sm={10}>
//                     <Tab.Content>
//                         <Tab.Pane eventKey="first"><Spinner /></Tab.Pane>
//                         <Tab.Pane eventKey="payment"><Payments /></Tab.Pane>
//                         <Tab.Pane eventKey="message"><MessageBooks /></Tab.Pane>
//                     </Tab.Content>
//                 </Col>
//             </Row>
//         </Tab.Container>
//     </div>
// );
