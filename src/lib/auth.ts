import { cookies } from 'next/headers';

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return token !== undefined && token.value !== '';
}

export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
}