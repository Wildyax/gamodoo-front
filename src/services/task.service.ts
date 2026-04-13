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

export const updateTask = async (taskId: number, data: {
    label: string;
    description: string;
    tags: string[];
    checked: boolean;
    difficulty: number;
}, token: string | null) => {
    const response = await fetch(`${apiUrl}/task/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erreur lors de la modification de la tâche");
    return response.json();
};

export const checkTask = async (token: string, taskId: number) => {
    const response = await fetch(`${apiUrl}/task/check/${taskId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Error checking task");
    }

    return response.json();
};

export const deleteTask = async (taskId: number, token: string | null) => {
    const response = await fetch(`${apiUrl}/task/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression de la tâche");
    return response.json();
};