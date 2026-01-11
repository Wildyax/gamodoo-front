"use client";

import AccountForm from "@/src/components/AccountForm/AccountForm";
import { register } from "@/src/services/register.service";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const result = await register(data);
      login(result.token);
      console.log("User created");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return <AccountForm onSubmit={onSubmit} withoutLogin={false} />;
}