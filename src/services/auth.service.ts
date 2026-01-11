type loginForm = {
  email: string;
  password: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: loginForm) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error during login");
  }

  return response.json();
};
