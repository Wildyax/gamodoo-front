'use client'; 
import AccountForm from '@/components/AccountForm/AccountForm';
import {useState} from 'react';
import { FormEvent } from 'react';

export default function CreateAccount() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget); 

        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${apiUrl}/users`, {
            method: 'POST', 
            body: JSON.stringify(data),
        });

        if(response.ok) {
            console.log("User create");
        } else {
            console.error("Error to create user");
        }
    }

    return(
        <>
            <AccountForm onSubmit={onSubmit} withoutLogin={false}/>
        </>
    );
}