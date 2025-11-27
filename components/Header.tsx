import Button from "./Button";
import translate from "../locales/fr.json";

export default function Header() {
  return (
      <nav className="flex items-center justify-between">
            <img src="logo/full_logo.png" alt="Logo" width={110} height={110} />
            <span className="flex gap-4">
                <Button label="inscription" color="--gradient-red"/>
                <Button label="connexion" color="--gradient-brown"/>
            </span>
      </nav>
  );
}
