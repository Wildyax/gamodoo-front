export default function Button({label, color}) {
    return(
        <button className="space-x-2 rounded-md shadow-lg px-4 py-2 font-semibold text-white" style={{backgroundColor: `var(${color})`}}>
            {label}
        </button>
    );
}