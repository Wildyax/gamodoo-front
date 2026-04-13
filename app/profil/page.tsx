'use client';

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/dist/client/link";
import translate from "./../../src/locales/fr.json";
import styles from "./style.module.css";
import { useState } from "react";
import { updateUser } from "@/src/services/user.service";

export default function ProfilPage() {
    const { user, logout, token, refreshUser } = useAuth();

    const [userPseudo, setUserPseudo] = useState(user?.login ?? '');
    const [userEmail, setUserEmail] = useState(user?.email ?? '');
    const [userPassword, setUserPassword] = useState('');
    const [userJob, setUserJob] = useState(user?.job?.id ?? 0);

    const jobImages = {
        "Assassin": "assassin.gif",
        "Magicien": "wizard.gif",
        "Archer": "archer.gif",
        "Épéiste": "sword.gif"
    };
    const imageName = jobImages[user?.job.name as keyof typeof jobImages] || "default.gif";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await await updateUser({ login: userPseudo, email: userEmail, password: userPassword, job: userJob }, token);
            if (token) await refreshUser(token);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    if (!user) return null;

    return (
        <div className={styles.pageWrapper}>

            <h1 className={styles.title}>
                {translate.user_profil.title}
            </h1>

            <div className={styles.terminal}>
                <div className={styles.terminalDots}>
                    <span></span><span></span><span></span>
                </div>
                <div className={styles.terminalLine}>
                    <span className={styles.terminalKey}>[SYS]</span>
                    <span className={styles.terminalValue}>MODIFICATIONS DISPONIBLES</span>
                    <span className={styles.terminalArrow}> &gt; </span>
                    <span className={styles.terminalHighlight}>login</span>,{" "}
                    <span className={styles.terminalHighlight}>email</span>
                </div>
            </div>

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
                        <label>{translate.user_profil.level}</label>
                        <input
                            type="text"
                            disabled
                            className={styles.inputDisable}
                            value={user?.level}
                        />
                    </div>
                    <div>
                        <label>{translate.user_profil.xp}</label>
                        <input
                            type="text"
                            disabled
                            className={styles.inputDisable}
                            value={user?.exp + " XPs"}
                        />
                    </div>
                </div>

                <label>{translate.user_profil.job}</label>
                <div className="border-3 border-[#682d1b] rounded-lg pb-5 flex justify-center">
                    <img
                        src={`characters/${imageName}`}
                        alt={user?.job?.name}
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <button
                        className="px-3 py-1.5 text-sm font-medium rounded-md shadow-md cursor-pointer text-white flex items-center justify-center whitespace-nowrap transition-all duration-150 hover:shadow-lg hover:brightness-110 active:scale-95"
                        style={{ background: `var(--gradient-red)` }}
                        type="submit"
                    >
                        {translate.user_profil.update}
                    </button>

                    <Link
                        href="/"
                        onClick={logout}
                        className="px-3 py-1.5 text-sm font-medium rounded-md shadow-md text-white flex items-center justify-center whitespace-nowrap transition-all duration-150 hover:shadow-lg hover:brightness-110 active:scale-95"
                        style={{ background: `var(--gradient-brown)` }}
                    >
                        {translate.navbar.logout}
                    </Link>
                </div>
            </form>
        </div>
    );
}