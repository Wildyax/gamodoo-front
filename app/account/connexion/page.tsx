"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { useRouter } from "next/navigation";
import { login as authService } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";
import { useError } from "@/src/context/ErrorContext";
import { useEffect } from "react";

export default function AccountConnexion() {
  const router = useRouter();
  const { showError } = useError();
  const { login, token } = useAuth();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if(token && user) {
      router.push('/dashboard')
    }
  }, [token, router]);

  const onSubmit = async (data: any) => {
    try {
      const result = await authService(data);
      login(result.token);

      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: { 'Authorization': `Bearer ${result.token}` }
      });
      const userData = await userResponse.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      showError('success', null, 'Connexion réussie');
      router.push("/dashboard");
    } catch (error) {
      showError('error', 500, "Mauvais identifiants ou erreur serveur");
    }
  };

  return <AccountForm selectedCharacter="5" onSubmit={onSubmit} withoutLogin={true} />;
}