"use client";
import styles from "./TaskContainer.module.css";
import { TaskData } from '@/src/models/Task';
const LEVEL_COUNT = 5;

interface TaskContainerProps {
    task: TaskData;
    onChange?: (taskId: number) => void;
    onView?: (task: TaskData) => void;
}

export default function TaskContainer({task, onChange, onView}: TaskContainerProps) {
    const handleChecked = () => {
        onChange?.(task.id ?? 0);
    }

    return (
        <div className={styles.container}>
            <button 
                className={task.checked ? styles.check : styles.unchecked}
                onClick={handleChecked}
            >
            </button>
            <div className={styles.card} onClick={() => onView?.(task)} style={{ cursor: 'pointer' }}>
                <div className={styles.dots}>
                    {Array.from({ length: LEVEL_COUNT }, (_, i) => (
                        <span 
                            key={i}
                            className={i > task.difficulty - 1 ? styles.dotActive : styles.dotInactive}
                        ></span>
                    ))}
                </div>
                <div className={styles.text}>{task.label}</div>
                <div className={styles.tagContainer}>
                    {(task.tags ?? []).map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}                   
                </div>
            </div>
        </div>
    );
}