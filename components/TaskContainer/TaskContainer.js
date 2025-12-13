"use client";
import {useState} from 'react';
import styles from "./TaskContainer.module.css";
const LEVEL_COUNT = 5;

export default function TaskContainer({ taskLabel = "default", level = 1, tagList = ["tag", "tag1"]}) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChecked = () => {
        setIsChecked(!isChecked);
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
                            className={i > level-1 ? styles.dotActive : styles.dotInactive}
                        ></span>
                    ))}
                </div>
                <div className={styles.text}>{taskLabel}</div>
                <div className={styles.tagContainer}>
                    {tagList.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}                   
                </div>
            </div>
        </div>
        </>
    );
}