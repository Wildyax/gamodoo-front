type loginForm = {
  email: string;
  password: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: loginForm) => {
  const response = await fetch(`${apiUrl}/login_check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error during login");
  }

  return response.json();
};
