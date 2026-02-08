'use client';
import {useState} from 'react';
import TaskContainer from "@/src/components/TaskContainer/TaskContainer";
import { TaskData } from '@/src/models/Task';

export default function DashBoard() {
    const [tasks, setTasks] = useState<TaskData[]>([
        { id: 1, label: "Révision", level: 2, description: "...", tags: ["cours"], checked: false, createdAt: new Date()},
        { id: 2, label: "Gaming", level: 5, description: "...", tags: ["jeu"], checked: false, createdAt: new Date() }
    ]);

    const handleCheckedTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, checked: !task.checked };
                }
                return task;
            })
        )
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map(task => (
                    <TaskContainer 
                        key= {task.id}
                        task={task}
                        onChange={handleCheckedTask}
                    />
                ))}
            </div>
        </>
    );
}