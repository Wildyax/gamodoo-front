'use client';

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/dist/client/link";
import translate from "./../../src/locales/fr.json";

export default function ProfilPage() {
    const { token, logout } = useAuth();
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
                            flex items-center justify-center
                            whitespace-nowrap`
                        }
                        style={{ background: `var(--gradient-brown)` }}
                        onClick={logout}
                    >
                        {translate.navbar.logout}
                    </Link>
        </>
    );
}