import { Experience } from "../models/Experience";
import { User } from "../models/User";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getExperienceByUserLevel(user: User, token: string): Promise<Experience | null> {
  const response = await fetch(`${apiUrl}/experience`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des expériences : ${response.status}`);
  }

  const data: Experience[] = await response.json();
  return data.find((exp) => exp.level === (user.level + 1)) ?? null;
}