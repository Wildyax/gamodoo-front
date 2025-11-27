import Image from "next/image";
import Header from "../components/Header";
import Button from "../components/Button";
import translate from "../locales/fr.json";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
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
            <Button label="inscription" color="--gradient-red"/>
            <div className="flex flex-col justify-center items-center m-4 rounded-md w-full" style={{background: `var(--gradient-red)`}}>
                <span className="flex flex-row">
                    <h1>{translate.homepage.explanation_title + " GAMODOO ?"} </h1>
                </span>
                {translate.homepage.explanation_1}<br />
                <img src="/screenshot/dashboard_page_to_do.png" alt="dashboard" width={600} height={400}/><br />
                {translate.homepage.explanation_2}<br />
                {translate.homepage.explanation_3}<br />
                <img src="/screenshot/add_modale.png" alt="add_task" width={600} height={400}/><br />
                {translate.homepage.explanation_4}<br />
                <img src="/screenshot/level.png" alt="level" width={600} height={400}/><br />
                {translate.homepage.explanation_5}<br />
            </div>
        </div>
    </div>
  );
}
