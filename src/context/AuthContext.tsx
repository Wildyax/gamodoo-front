"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/User";

type AuthContextType = {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    setUser: (user: any) => void;
    logout: () => void;
    refreshUser: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async (currentToken: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        }
    };

    useEffect(() => {
        const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (cookieToken) {
            setToken(cookieToken);
        }

        const saved = localStorage.getItem('user');
        if (saved) setUser(JSON.parse(saved));
        setLoading(false);
    }, []);

    const login = (newToken: string) => {
        document.cookie = `token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 jours
        setToken(newToken);
    };

    const isLogin = () => {
        return token !== null;
    };

    const logout = () => {
        document.cookie = 'token=; path=/; max-age=0';
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, setUser, user, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};  