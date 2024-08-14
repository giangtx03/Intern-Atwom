import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';  
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';                               


interface MenuItem {
    label: string;
    icon: string;
    link?: string;
    badge?: string;
    shortcut?: string;
    command?: () => void;
}

export default function Header() {
    const navigate = useNavigate();
    const menu = useRef<Menu>(null);

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'History',
            icon: 'pi pi-star',
            command: () => navigate('/history')
        },
    ];

    const userMenuItems = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navigate('/profile')
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => navigate('/settings')
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => navigate('/logout')
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" className="cursor-pointer" onClick={(e) => menu.current?.toggle(e)} />
            <Menu model={userMenuItems} popup ref={menu} />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}
