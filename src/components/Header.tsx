'use client';
import translate from "../locales/fr.json";
import Link from 'next/link';
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";

export default function Header() {
    const { token, logout } = useAuth();

    return (
        <nav
            className="
        w-full
        flex items-center justify-between
        px-2
      "
        >
            <Link href="/">
                <Image
                    src="/logo/full_logo.png"
                    alt="Logo"
                    width={90}
                    height={90}
                    className="w-20 h-auto sm:w-28 cursor-pointer"
                />
            </Link>
            <div className="flex gap-2">
                {token ? (
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
                    ) : (
                    <>
                    <Link
                        href="/account/new"
                        className={`
                            px-3 py-1.5
                            text-sm font-medium
                            rounded-md
                            shadow-md
                            text-white
                            flex items-center justify-center
                            whitespace-nowrap`
                        }
                        style={{ background: `var(--gradient-red)` }}
                    >
                        {translate.navbar.inscription}
                    </Link>
                    <Link
                        href="/account/connexion"
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
                    >
                        {translate.navbar.login}
                    </Link>
                    </>)
                }
            </div>
        </nav>
    );
}


