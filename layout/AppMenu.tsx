'use client';

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Início',
            items: [{ label: 'Início', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Alunos', icon: 'pi pi-fw pi-graduation-cap', to: '/alunos' },
                { label: 'Cursos', icon: 'pi pi-fw pi-book', to: '/cursos' },
                { label: 'Disciplinas', icon: 'pi pi-fw pi-list', to: '/disciplinas' },
                { label: 'Professores', icon: 'pi pi-fw pi-id-card', to: '/professores' },
                { label: 'Turmas', icon: 'pi pi-fw pi-users', to: '/turmas' },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
