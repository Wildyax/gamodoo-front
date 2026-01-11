"use client";
import {useState} from 'react';
import styles from "./TaskContainer.module.css";
import { TaskData } from '@/src/models/Task';
const LEVEL_COUNT = 5;

interface TaskContainerProps {
    task: TaskData;
    onChange?: (taskId: number) => void;
}

export default function TaskContainer({task, onChange}: TaskContainerProps) {
    const [isChecked, setIsChecked] = useState(task.checked);

    const handleChecked = () => {
        setIsChecked(!isChecked);
        onChange?.(task.id);
    }

    return (
        <>
        <div className={styles.container}>
            <button 
                className={isChecked ? styles.check : styles.unchecked}
                onClick={handleChecked}
            >
            </button>
            <div className={styles.card}>
                <div className={styles.dots}>
                    {Array.from({ length: LEVEL_COUNT }, (_, i) => (
                        <span 
                            key={i}
                            className={i > task.level-1 ? styles.dotActive : styles.dotInactive}
                        ></span>
                    ))}
                </div>
                <div className={styles.text}>{task.label}</div>
                <div className={styles.tagContainer}>
                    {task.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}                   
                </div>
            </div>
        </div>
        </>
    );
}