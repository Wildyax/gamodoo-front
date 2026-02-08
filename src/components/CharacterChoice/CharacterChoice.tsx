"use client";

import styles from "./CharacterChoice.module.css";
import translate from "../../locales/fr.json";

type CharacterChoiceProps = {
    onSelect: (character: string) => void;
    selectedCharacter: string | null;
};

export default function CharacterChoice({ onSelect, selectedCharacter }: CharacterChoiceProps) {
    const characters = ["sword", "archer", "wizard", "assassin"];

    const description =
        selectedCharacter
            ? translate.account.create.character_description[
                selectedCharacter as keyof typeof translate.account.create.character_description
              ]
            : null;

    const handleCharacterHover = (character: string) => {
        onSelect(character);
        console.log(character);
    };

    return (
        <>
        <div className="flex flex-col items-center m-10 p-4">
            <h3 className={`${styles.title} text-center`}>{translate.account.create.select_character}</h3> 
            <div className={styles.container}>
                <div className={styles.characterList}>
                    {characters.map((character) => (
                        <div
                            key={character}
                            className={`
                                ${styles.characterItem}
                                ${selectedCharacter === character ? styles.selected : ""}
                            `}
                            onClick={() => handleCharacterHover(character)}
                        >
                            <img
                                src={`/characters/${character}.gif`}
                                alt={character}
                                className={styles.characterImage}
                            />
                        </div>
                    ))}
                </div>
                <div>
                        {description && (
                            <p className={styles.description}>
                                {description}
                            </p>
                        )}
                    </div>
            </div>
        </div>
        </>
    );
}