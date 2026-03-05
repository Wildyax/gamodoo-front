import { Job } from "./Job";

export interface User {
    id: number;
    job: Job;
    email: string;
    level: number;
    exp: number;
    roles: string[];
    password: string;
    login: string;
}