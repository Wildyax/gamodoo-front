import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    current: number;
    max: number;
    label?: string;
}

export default function ProgressBar({ current, max, label }: ProgressBarProps) {
    const percentage = (current / max) * 100;

    return (
        <div className={styles.container}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.barContainer}>
                <div 
                    className={styles.barFill}
                    style={{ width: `${percentage}%` }}
                />
                <span className={styles.text}>{current}/{max}</span>
            </div>
        </div>
    );
}