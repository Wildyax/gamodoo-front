const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function updateUser(data: {
    login: string | undefined;
    email: string | undefined;
    password: string;
    job: number | undefined
}, token: string | null) {
    const response = await fetch(`${apiUrl}/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erreur lors de la mise à jour");
    return response.json();
}