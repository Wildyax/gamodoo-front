"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (cookieToken) {
            setToken(cookieToken);
        }
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
        <AuthContext.Provider value={{ token, login, logout }}>
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