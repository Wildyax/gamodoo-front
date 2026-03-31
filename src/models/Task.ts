import { User } from "./User";

export interface TaskData {
    id?: number;
    label: string;
    description: string;
    tags: string[];
    checked: boolean;
    difficulty: number;
    // createdAt: Date;
}