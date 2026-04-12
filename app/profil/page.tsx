'use client';

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/dist/client/link";
import translate from "./../../src/locales/fr.json";
import UnderConstruction from "@/src/components/UnderConstruction/UnderConstruction";
import styles from "@/src/components/Profil/Profil.module.css";
import {useState} from "react";


export default function ProfilPage() {
    const { user, logout } = useAuth();

    const [userPseudo, setUserPseudo] = useState(user?.login)
    const [userEmail, setUserEmail] = useState(user?.email)
    const [userPassword, setUserPassword] = useState('')
    const [userJob, setUserJob] = useState(user?.job.id)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const jobImages = {
        "Assassin": "assassin.gif",
        "Magicien": "wizard.gif",
        "Archer": "archer.gif",
        "Épéiste": "sword.gif"
    }
    const imageName = jobImages[user?.job.name as keyof typeof jobImages] || "default.gif";

    async function updateUser(data: {
        login: string | undefined;
        email: string | undefined;
        password: string;
        job: number | undefined
    }) {
        const token = localStorage.getItem('token');

        const response = await fetch(`${apiUrl}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateUser({
            "login": userPseudo,
            "email": userEmail,
            "password": userPassword,
            "job": userJob
        })
    }

    return (
        <>
            <h1>
                Mon profil
            </h1>

            <form className={styles.form} onSubmit={handleSubmit}>

                <label>{translate.account.create.login}</label>
                <input
                    type="text"
                    name="login"
                    className={styles.input}
                    value={userPseudo}
                    required
                    onChange={e => setUserPseudo(e.target.value)}
                />

                <label>{translate.account.create.mail}</label>
                <input
                    type="email"
                    name="email"
                    className={styles.input}
                    value={userEmail}
                    required
                    onChange={e => setUserEmail(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label>Niveau</label>
                        <input
                            type="text"
                            disabled
                            className={styles.inputDisable}
                            value={user?.level}
                        />
                    </div>

                    <div>
                        <label>Expérience</label><br/>
                        <input
                            type="text"
                            disabled
                            className={styles.inputDisable}
                            value={user?.exp + " XPs"}
                        />
                    </div>
                </div>

                {user?.id}

                <label>Classe</label>
                <div
                    className="
                        border-3
                        border-[#682d1b]
                        rounded-lg
                        pb-5
                    "
                >

                    <img
                        src={`characters/${imageName}`}
                        alt={user?.job?.name}
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <button
                        className="
                        px-3 py-1.5
                        text-sm font-medium
                        rounded-md
                        shadow-md
                        cursor-pointer
                        text-white
                        flex items-center justify-center
                        whitespace-nowrap
                        transition-all duration-150
                        hover:shadow-lg
                        hover:brightness-110
                        active:scale-95
                      "
                        style={{ background: `var(--gradient-red)` }}
                        type="submit"
                    >
                        ENREGISTRER
                    </button>

                    <Link
                        href="/"
                        onClick={logout}
                        className="
                        px-3 py-1.5
                        text-sm font-medium
                        rounded-md
                        shadow-md
                        text-white
                        flex items-center justify-center
                        whitespace-nowrap
                        transition-all duration-150
                        hover:shadow-lg
                        hover:brightness-110
                        active:scale-95
                      "
                        style={{ background: `var(--gradient-brown)` }}
                        type="submit"
                    >
                        {translate.navbar.logout}
                    </Link>
                </div>
            </form>
        </>
    );
}