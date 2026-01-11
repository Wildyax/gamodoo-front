'use client'; 
import AccountForm from '@/components/AccountForm/AccountForm';
import {FormEvent, useState} from 'react';
import {useRouter} from "next/navigation";

export default function AccountConnexion() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget); 
    
        const data = Object.fromEntries(formData.entries());
    
       try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('User connected');
                router.push('/dashboard');
            } else {
                console.error('Connexion error');
            }
        } catch (error) {
            console.error('Server error', error);
        }
    }

    return (
        <>
            <AccountForm onSubmit={onSubmit} withoutLogin={true}/>
        </>
    );
}