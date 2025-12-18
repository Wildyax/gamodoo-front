'use client';
import translate from "../locales/fr.json";
import {useRouter} from "next/navigation";
import Link from 'next/link';

export default function Home() {
    const router = useRouter();

    const goToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col md:flex-row gap-4 m-4 items-center justify-center w-full">
                <div className="w-full md:w-1/2 flex flex-col items-center m-4 text-center">
                    <h1>{translate.homepage.title}</h1>
                    <p className="mt-2">{translate.homepage.traduction}</p>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center m-4">
                    <img
                        src="/characters/sword.gif"
                        alt="Character_sword"
                        className="w-3/4 md:w-full max-w-sm md:max-w-md h-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center m-4">
                <Link
                    href="/dashboard"
                    className="rounded-md shadow-lg px-6 py-3 font-semibold text-white"
                    style={{ background: `var(--gradient-red)` }}
                >
                    {translate.navbar.inscription}
                </Link>
            </div>

            <div
                className="flex flex-col items-center m-4 rounded-md w-full p-4 text-center"
                style={{ background: `var(--gradient-red)` }}
            >
                <h2 className="mb-2">{translate.homepage.explanation_title + " GAMODOO ?"}</h2>
                <p className="mb-2">{translate.homepage.explanation_1}</p>
                <img
                    src="/screenshot/dashboard_page_to_do.png"
                    alt="dashboard"
                    className="w-full max-w-lg h-auto mb-2"
                />
                <p className="mb-2">{translate.homepage.explanation_2}</p>
                <p className="mb-2">{translate.homepage.explanation_3}</p>
                <img
                    src="/screenshot/add_modale.png"
                    alt="add_task"
                    className="w-full max-w-lg h-auto mb-2"
                />
                <p className="mb-2">{translate.homepage.explanation_4}</p>
                <img
                    src="/screenshot/level.png"
                    alt="level"
                    className="w-full max-w-lg h-auto mb-2"
                />
                <p className="mb-2">{translate.homepage.explanation_5}</p>
            </div>
        </div>
    );
}
