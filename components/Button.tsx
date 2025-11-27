import translate from "../locales/fr.json";

export default function Button({label, color}) {
    return(
        <button className="space-x-2 rounded-md shadow-lg px-4 py-2 font-semibold text-white" style={{background: `var(${color})`}}>
            {translate.navbar[label]}
        </button>
    );
}