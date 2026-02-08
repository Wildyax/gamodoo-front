type RegisterForm = {
  login: string;
  email: string;
  password: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const register = async (data: RegisterForm) => {
  const response = await fetch(
    `${apiUrl}/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error during registration");
  }

  return response.json();
};
