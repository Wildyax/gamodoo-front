"use client"

import Link from "next/link";
import translate from "@/src/locales/fr.json";
import { useAuth } from "@/src/context/AuthContext";

export function LogoutButton() {
    const { logout } = useAuth();

    return (
        <>
            <Link
                href="/"
                className={`
                
                    px-3 py-1.5
                    text-sm font-medium
                    rounded-md
                    shadow-md
                    text-white
                    mt-5`
                }
                style={{ background: `var(--gradient-brown)` }}
                onClick={logout}
            >
                {translate.navbar.logout}
            </Link>
        </>
    )
}