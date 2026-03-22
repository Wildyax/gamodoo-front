'use client';
import {useState} from 'react';
import TaskContainer from "@/src/components/TaskContainer/TaskContainer";
import { TaskData } from '@/src/models/Task';
import ToggleButton from '@/src/components/ToggleButton/ToggleButton';
import "../dashboard/style.css";
import translate from "@/src/locales/fr.json";
import UserStatistics from '@/src/components/UserStatistics/UserStatistics';
import TaskModal from '@/src/components/TaskModal/TaskModal';
import {useAuth} from "@/src/context/AuthContext";
import {redirect} from "next/navigation";
import {router} from "next/client";
import { useEffect } from 'react';
import { getTasks } from "@/src/services/task.service";

export default function DashBoard() {
    // Si pas connecté redirigé vers la page de connexion
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);
    
    if(!token) redirect('/account/connexion');

    //TODO : a remplacer par une vraie récupération des tâches
    // const [tasks, setTasks] = useState<TaskData[]>([
    //     { id: 1, label: "Révision", level: 2, description: "...", tags: ["cours"], checked: false},
    //     { id: 2, label: "Gaming", level: 5, description: "...", tags: ["jeu"], checked: false}
    // ]);

    useEffect(() => {
        if (!token) return;
        
        getTasks(token)
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, [token]);

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

    const fetchTasks = () => {
    if (!token) return;
        getTasks(token)
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    return (
        <>
        <div className="flex flex-col lg:flex-row h-full gap-0">
 
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 gap-2">
    
                    <div className="flex justify-center sm:hidden">
                        <img
                            src="logo/full_logo.png"
                            alt="Logo"
                            className="w-24 h-auto"
                        />
                    </div>
            
                    <div className="flex flex-row justify-between items-center gap-2 sm:contents">
                        <ToggleButton />
                
                        <img
                            src="logo/full_logo.png"
                            alt="Logo"
                            className="hidden sm:block w-20 lg:w-28 h-auto"
                        />
                
                        <button className="button items-center justify-center inline-flex rounded-full shadow-lg
                            px-4 py-2 text-sm
                            lg:px-6 lg:py-2
                            font-medium whitespace-nowrap"
                            onClick={() => setIsModalOpen(true)}>
                            {translate.navbar_dashboard.add}
                        </button>
                    </div>
                </div>
    
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 flex-1">
                    {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <TaskContainer 
                                    key={task.id ?? index}
                                    task={task}
                                    onChange={handleCheckedTask}
                                />
                            ))
                        ) : (
                            <p>{translate.task_card.no_task}</p>
                        )}
                </div>
            </div>
            
            <div className="w-full lg:w-auto lg:flex-shrink lg:max-w-xs xl:max-w-sm">
                <UserStatistics />
            </div>
 
        </div>
            {isModalOpen && (
                <TaskModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={() => {
                        fetchTasks();
                        setIsModalOpen(false);
                    }}
                />
            )}
        </>
    );
}