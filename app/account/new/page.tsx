"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { register } from "@/src/services/register.service";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CharacterChoice from "@/src/components/CharacterChoice/CharacterChoice";
import { useError } from "@/src/context/ErrorContext";

export default function CreateAccount() {
  const router = useRouter();
  const { showError } = useError();
  const { login } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>("sword");
  

  const onSubmit = async (data: any) => {
    try {
      const result = await register(data);
      //TODO: penser a récupérer le token a la place du login
      login(result.user_login);
      console.log("User created");
      showError('success', null, 'Création de compte réussie');
      router.push("/dashboard");
    } catch (error) {
      showError('error', 500, "Erreur serveur");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-stretch gap-8 px-4">
        <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
                <AccountForm
                    onSubmit={onSubmit}
                    withoutLogin={false}
                    selectedCharacter={selectedCharacter}
                />
            </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
                <CharacterChoice
                    selectedCharacter={selectedCharacter}
                    onSelect={(character) => setSelectedCharacter(character)}
                />
            </div>
        </div>
      </div>
    </>
  );
}