import { useState } from "react";
import styles from "./ToggleButton.module.css";
import translate from "../../locales/fr.json";

export default function ToggleButton() {
    const [isComplete, setComplete] = useState(false);

    return (
        <>
        <div className={`${styles.toggleContainer} inline-flex rounded-full p-1 shadow-lg`}>
            <button
                onClick={() => setComplete(true)}
                className={`${styles.toggleButton} px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border-none cursor-pointer ${
                isComplete ? `${styles.active}` : ''
                }`}
            >
                {translate.navbar_dashboard.todo}
            </button>
            <button
                onClick={() => setComplete(false)}
                className={`${styles.toggleButton} px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border-none cursor-pointer ${
                !isComplete ? `${styles.active}` : ''
                }`}
            >
                {translate.navbar_dashboard.realised}
            </button>
        </div>
        </>
    );
}