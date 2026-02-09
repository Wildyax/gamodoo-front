"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import {redirect, useRouter} from "next/navigation";
import { login as authService } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";
import { useError } from "@/src/context/ErrorContext";
import {useEffect} from "react";

export default function AccountConnexion() {
  const router = useRouter();
  const { showError } = useError();
  const { login, token } = useAuth();

  useEffect(() => {
    if(token) {
      router.push('/')
    }
  }, [token, router]);

  const onSubmit = async (data: any) => {
    try {
      const result = await authService(data);
      console.log(result)

      login(result.token);
      showError('success', null, 'Connexion réussie');

      router.push("/dashboard");
    } catch (error) {
      showError('error', 500, "Mauvais identifiants ou erreur serveur");
    }
  };

  return <AccountForm selectedCharacter="5" onSubmit={onSubmit} withoutLogin={true} />;
}
