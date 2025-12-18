'use client';
import translate from "../locales/fr.json";
import Link from 'next/link';
import Image from "next/image";

export default function Header() {
    return (
        <nav
            className="
        w-full
        flex items-center justify-between
        px-2
      "
        >
            <Image
                src="/logo/full_logo.png"
                alt="Logo"
                width={90}
                height={90}
                className="w-20 h-auto sm:w-28"
            />

            <div className="flex gap-2">
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
                    {translate.navbar.connexion}
                </Link>
            </div>
        </nav>
    );
}


