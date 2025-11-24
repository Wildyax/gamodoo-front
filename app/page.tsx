import Image from "next/image";
import Header from "../components/Header";
import Button from "../components/Button";
import translate from "../locales/fr.json";

export default function Home() {
  return (
    <div>
        <Header />
        <div className="flex gap-2">
            <div className="flex-1 place-content-center m-4">
                <h1>{translate.homepage.title}</h1>
                <p>{translate.homepage.traduction}</p>
            </div>
            <div className="flex-1 items-center m-4">
                <img src="/characters/sword.gif" alt="Character_sword" width={300} height={300}/>
            </div>
        </div>
        <div className="flex flex-col items-center m-4">
            <Button label="Démarre l'aventure !" color="--color-3"/>
            <div className="flex justify-center m-4 grow" style={{backgroundColor: `var(--color-4)`}}>
                <p> Add un peu de description mdr </p>
            </div>
        </div>
    </div>
  );
}
