import Button from "./Button";

export default function Header() {
    return (
        <nav
            className="
        w-full
        flex items-center justify-between
        px-2
      "
        >
            <img
                src="logo/full_logo.png"
                alt="Logo"
                width={90}
                height={90}
                className="w-20 h-auto sm:w-28"
            />

            <div className="flex gap-2">
                <Button label="inscription" color="--gradient-red" className="hidden sm:block"/>
                <Button label="connexion" color="--gradient-brown" />
            </div>
        </nav>
    );
}


