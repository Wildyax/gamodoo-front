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
                console.log('Utilisateur connecté');
                router.push('/dashboard');
            } else {
                console.error('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur réseau', error);
        }
    }

    return (
        <>
            <p>Je suis la page de connexion de compte</p>
            <AccountForm onSubmit={onSubmit} withoutLogin={true}/>
        </>
    );
}