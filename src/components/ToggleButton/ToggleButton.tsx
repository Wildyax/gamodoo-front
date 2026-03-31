import { useState } from "react";
import styles from "./ToggleButton.module.css";
import translate from "../../locales/fr.json";

export default function ToggleButton({ onToggle }: { onToggle: (isComplete: boolean) => void }) {
    const [isComplete, setComplete] = useState(true);

    return (
        <div className={`${styles.toggleContainer} inline-flex rounded-full p-1 shadow-lg`}>
            <button
                onClick={() => {
                    setComplete(true);
                    onToggle(false);
                }}
                className={`${styles.toggleButton} px-3 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm rounded-full font-medium transition-all duration-300 border-none cursor-pointer ${
                    isComplete ? styles.active : ''
                }`}
            >
                {translate.navbar_dashboard.todo}
            </button>
            <button
                onClick={() => {
                    setComplete(false);
                    onToggle(true);
                }}
                className={`${styles.toggleButton} px-3 py-1 text-xs sm:px-6 sm:py-2 sm:text-sm rounded-full font-medium transition-all duration-300 border-none cursor-pointer ${
                    !isComplete ? styles.active : ''
                }`}
            >
                {translate.navbar_dashboard.realised}
            </button>
        </div>
    );
}