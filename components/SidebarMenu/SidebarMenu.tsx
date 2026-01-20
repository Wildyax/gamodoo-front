"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdSettings, MdEmojiEvents, MdAccountCircle, MdMenu, MdClose } from 'react-icons/md';
import styles from "./SidebarMenu.module.css";
import translate from "../../locales/fr.json";
import Link from 'next/link';

const MenuItem = [
    {id: 1, label: translate.sidebar.menu, path: "/dashboard", icon: MdDashboard}, 
    {id: 2, label: translate.sidebar.administration, path: "/administration", icon: MdSettings},
    {id: 3, label: translate.sidebar.leaderboard, path: "/leaderboard", icon: MdEmojiEvents}, 
    {id: 4, label: translate.sidebar.account, path: "/account", icon: MdAccountCircle}
]

export default function SidebarMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button 
                className={styles.burgerButton}
                onClick={toggleMenu}
                aria-label="Menu"
            >
                {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            <div 
                className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
                onClick={closeMenu}
            />

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                {MenuItem.map(item => {
                    const IconComponent = item.icon;
                    return (
                        <nav key={item.id} className={styles.navItem}>
                            <Link
                                href={item.path}
                                onClick={closeMenu}
                                className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
                            >
                                {IconComponent && <IconComponent className={styles.icon} size={30} />}
                            </Link>
                        </nav>
                    );
                })}
            </div>
        </>
    );
}