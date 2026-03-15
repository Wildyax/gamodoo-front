'use client';
import {useState} from 'react';
import TaskContainer from "@/src/components/TaskContainer/TaskContainer";
import { TaskData } from '@/src/models/Task';
import ToggleButton from '@/src/components/ToggleButton/ToggleButton';
import "../dashboard/style.css";
import translate from "@/src/locales/fr.json";
import UserStatistics from '@/src/components/UserStatistics/UserStatistics';
import {useAuth} from "@/src/context/AuthContext";
import {redirect} from "next/navigation";
import {router} from "next/client";

export default function DashBoard() {
    // Si pas connecté redirigé vers la page de connexion
    const { token } = useAuth();
    if(!token) redirect('/account/connexion');

    //TODO : a remplacer par une vraie récupération des tâches
    const [tasks, setTasks] = useState<TaskData[]>([
        { id: 1, label: "Révision", level: 2, description: "...", tags: ["cours"], checked: false, createdAt: new Date()},
        { id: 2, label: "Gaming", level: 5, description: "...", tags: ["jeu"], checked: false, createdAt: new Date() }
    ]);


    //détection de changement d'état d'une tâche
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
        <div className="flex flex-col lg:flex-row h-full gap-0">
 
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-row justify-between items-center p-2">
                    <ToggleButton />
                    <img
                        src="logo/full_logo.png"
                        alt="Logo"
                        width={10}
                        height={5}
                        className="w-20 sm:w-28"
                    />
                    <button className="button items-center justify-center inline-flex rounded-full p-1 shadow-lg px-6 py-2 text-sm font-medium">
                        {translate.navbar_dashboard.add}
                    </button>
                </div>
 
                <div className="flex-1">
                    {tasks.map(task => (
                        <TaskContainer
                            key={task.id}
                            task={task}
                            onChange={handleCheckedTask}
                        />
                    ))}
                </div>
            </div>
            
            <div className="w-full lg:w-auto lg:flex-shrink-0">
                <UserStatistics />
            </div>
 
        </div>
    );
}