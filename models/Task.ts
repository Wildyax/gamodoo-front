export interface TaskData {
    id: number;
    label: string;
    level: number;
    description: string;
    tags: string[];
    checked: boolean;
    createdAt: Date;
}