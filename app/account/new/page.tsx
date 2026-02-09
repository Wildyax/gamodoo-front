"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { register } from "@/src/services/register.service";
import { useAuth } from "@/src/context/AuthContext";
import {redirect, useRouter} from "next/navigation";
import { useState } from "react";
import CharacterChoice from "@/src/components/CharacterChoice/CharacterChoice";
import { useError } from "@/src/context/ErrorContext";

export default function CreateAccount() {
  const router = useRouter();
  const { showError } = useError();
  const { login, token } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>("sword");

  if(token) {
      redirect('/')
  }

  const onSubmit = async (data: any) => {
      const JOBS_MAP: Record<string, number> = {
          sword: 8,
          archer: 7,
          wizard: 6,
          assassin: 5,
      };
    try {
        const jobId = JOBS_MAP[data.job];

        const payload = {
            ...data,
            job: jobId,
        };

        const result = await register(payload);

        login(result.user_login);

        showError('success', null, 'Création de compte réussie');

        router.push("/account/connexion");
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