import translate from "../locales/fr.json";

export default function Button({ label, color, className = '' }) {
    return (
        <button
            className={`
        px-3 py-1.5
        text-sm font-medium
        rounded-md
        shadow-md
        text-white
        flex items-center justify-center
        whitespace-nowrap
        ${className}
      `}
            style={{ background: `var(${color})` }}
        >
            {translate.navbar[label]}
        </button>
    );
}