'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export type ErrorType = 'error'|'success';

interface ErrorMessage {
    type: ErrorType;
    code: number | null;
    message: string;
}

interface ErrorContextInterface {
    errorMessage: ErrorMessage | null;
    showError: (type: ErrorType, code: number | null, message: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextInterface | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

    const showError = (type: ErrorType, code: number | null, message: string) => {
        setErrorMessage({ type, code, message });
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    const clearError = () => setErrorMessage(null);

    return (
        <ErrorContext.Provider value={{ errorMessage, showError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    if(!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
}