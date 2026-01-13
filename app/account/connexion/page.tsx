"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { useRouter } from "next/navigation";
import { login as authService } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";
import { useError } from "@/src/context/ErrorContext";

export default function AccountConnexion() {
  const router = useRouter();
  const { showError } = useError();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const result = await authService(data);
      //TODO: penser a récupérer le token a la place du email
      login(result.user_email);
      showError('success', null, 'Connexion réussie');
      router.push("/dashboard");
    } catch (error) {
      showError('error', 500, "Mauvais identifiants ou erreur serveur");
    }
  };

  return <AccountForm onSubmit={onSubmit} withoutLogin={true} />;
}
