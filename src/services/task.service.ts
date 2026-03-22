import { TaskData } from "../models/Task";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createTask = async (data: TaskData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/task`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error during task creation");
    }

    return response.json();
};

export const getTasks = async (token: string) => {
    const response = await fetch(`${apiUrl}/task`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching tasks");
    }

    return response.json();
};