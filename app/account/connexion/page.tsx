"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { useRouter } from "next/navigation";
import { login as authService } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";

export default function AccountConnexion() {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const result = await authService(data);
      //TODO: penser a récupérer le token a la place du email
      login(result.user_email);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return <AccountForm onSubmit={onSubmit} withoutLogin={true} />;
}
