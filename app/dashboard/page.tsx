'use client';
import React from 'react';
import {useState} from 'react';
import TaskContainer from "@/src/components/TaskContainer/TaskContainer";
import { TaskData } from '@/src/models/Task';
import ToggleButton from '@/src/components/ToggleButton/ToggleButton';
import style from "./style.module.css";
import translate from "@/src/locales/fr.json";
import UserStatistics from '@/src/components/UserStatistics/UserStatistics';
import TaskModal from '@/src/components/TaskModal/TaskModal';
import {useAuth} from "@/src/context/AuthContext";
import {redirect} from "next/navigation";
import { useEffect } from 'react';
import { getTasks, checkTask } from "@/src/services/task.service";

export default function DashBoard() {
    const { token, refreshUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskState, setTaskState] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [allTasks, setAllTasks] = useState<TaskData[]>([]);
    const [todoCount, setTodoCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    
    if(!token) redirect('/account/connexion');

    const handleCheckedTask = (taskId: number) => {
        const task = allTasks.find(t => t.id === taskId);
        if (!task || !token) return;

        checkTask(token, taskId)
            .then(() => {
                const updatedAll = allTasks.map(t => t.id === taskId ? { ...t, checked: true } : t);
                setAllTasks(updatedAll);
                setTasks(updatedAll.filter(t => t.checked === taskState));
                setTodoCount(updatedAll.filter(t => !t.checked).length);
                setDoneCount(updatedAll.filter(t => t.checked).length);
                refreshUser(token);
            })
            .catch(err => console.error(err));
    };

    const handleToggle = (isComplete: boolean) => {
        setTaskState(isComplete);
        setTasks(allTasks.filter(task => task.checked === isComplete));
    };

    const fetchTasks = (showCompleted = false) => {
        if (!token) return;
        getTasks(token)
            .then(res => {
                const tasks = res.data;
                setAllTasks(tasks);
                setTasks(tasks.filter((t: TaskData) => t.checked === showCompleted));
                setTodoCount(tasks.filter((t: TaskData) => !t.checked).length);
                setDoneCount(tasks.filter((t: TaskData) => t.checked).length);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTasks(taskState);
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
                        <ToggleButton onToggle={handleToggle} />
                
                        <img
                            src="logo/full_logo.png"
                            alt="Logo"
                            className="hidden sm:block w-20 lg:w-28 h-auto"
                        />
                
                        <button className={`${style.button} items-center justify-center inline-flex rounded-full shadow-lg
                            px-4 py-2 text-sm
                            lg:px-6 lg:py-2
                            font-medium whitespace-nowrap`}
                            onClick={() => setIsModalOpen(true)}>
                            {translate.navbar_dashboard.add}
                        </button>
                    </div>
                </div>
    
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 content-start">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <TaskContainer key={task.id ?? index} task={task} onChange={handleCheckedTask} />
                        ))
                    ) : (
                        <div className={style.emptyState}>
                            <p className={style.emptyLine}>
                                <span className={style.emptyTag}>[QUÊTE]</span>
                                <span className={style.emptyDots}> .............. </span>
                                <span className={style.emptyStatus}>AUCUNE TÂCHE</span>
                            </p>
                            <p className={style.emptyLine}>
                                <span className={style.emptyTag}>[HÉROS]</span>
                                <span className={style.emptyDots}> .............. </span>
                                <span className={style.emptyStatus}>EN ATTENTE</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="w-full lg:w-auto lg:flex-shrink lg:max-w-xs xl:max-w-sm">
                <UserStatistics todoCount={todoCount} doneCount={doneCount} />
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