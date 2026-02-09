'use client';
import {useState} from 'react';
import TaskContainer from "@/components/TaskContainer/TaskContainer";
import { TaskData } from '@/models/Task';
import ToggleButton from '@/components/ToggleButton/ToggleButton';
import "../dashboard/style.css";
import translate from "../../locales/fr.json";

export default function DashBoard() {
    //ensemble des tâches qu'on récupère 
    const [tasks, setTasks] = useState<TaskData[]>([
        { id: 1, label: "Révision", level: 2, description: "...", tags: ["cours"], checked: false, createdAt: new Date()},
        { id: 2, label: "Gaming", level: 5, description: "...", tags: ["jeu"], checked: false, createdAt: new Date() }
    ]);

    //détection du changement d'état de notre tâche en réalisé ou non
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
            <div className="grid grid-cols-4 grid-rows-5 gap-0 h-full">
                <div className="col-start-1 col-end-4 row-start-1 row-end-2">
                    <div className="flex flex-row justify-between">
                        <ToggleButton></ToggleButton>
                        <img
                            src="logo/full_logo.png"
                            alt="Logo"
                            width={10}
                            height={5}
                            className="w-20 sm:w-28"
                        />
                        <button className="button items-center justify-center inline-flex rounded-full p-1 shadow-lg px-6 py-2 text-sm font-medium" >
                            { translate.navbar_dashboard.add }
                        </button>
                    </div>
                </div>
                <div className="col-start-1 col-end-4 row-start-2 row-end-6">
                    {tasks.map(task => (
                        <TaskContainer 
                            key={task.id}
                            task={task}
                            onChange={handleCheckedTask}
                        />
                    ))}
                </div>
                <div className="col-start-4 col-end-5 row-start-1 row-end-6">
                    
                </div>
            </div>
        </>
    );
}