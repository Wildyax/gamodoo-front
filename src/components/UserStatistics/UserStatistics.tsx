'use client';
import { useAuth } from "@/src/context/AuthContext";
import styles from "./UserStatistics.module.css";
import translate from "../../locales/fr.json";
import ProgressBarProps from "../ProgressBar/ProgressBar";
import CircleChart from "../CircleChart/CircleChart";

const getJobImage = (jobId: string | number): string => {
    console.log("Job ID:", jobId);
    switch(jobId) {
        case 1:
            return `../../../characters/assassin.gif`;
        case 2:
            return `../../../characters/wizard.gif`;
        case 3:
            return `../../../characters/archer.gif`;
        case 4:
            return `../../../characters/sword.gif`;
        default:
            return `..`;
    }
};

export default function UserStatistics() {
    const { user } = useAuth();
    if (!user) return null;

    const taskData = [
        { name: translate.user_info_card.to_do, value: 30, fill: '#CDA47B' },
        { name: translate.user_info_card.realised, value: 10, fill: '#642B19' },
    ];
    
    return (
        <>
            <div className={`${styles.userInformations} col-start-5 col-end-6 row-start-1 row-end-4`}>
                <span className={styles.greeting}>{translate.user_info_card.hello} {user.login} !</span>
                
                <div className={styles.bossSection}>
                    {/* TODO: a modifier dynamiquement */}
                    <span className={styles.bossLabel}>Boss 1/10</span> 
                </div>

                <div className={styles.statsWrapper}>
                        <div className={styles.statItem}>
                            <label className={styles.statLabel}>{translate.user_info_card.xp}</label>
                            <ProgressBarProps current={user.exp} max={100} label="" />
                        </div>

                        <div className={styles.statItem}>
                            <label className={styles.statLabel}>{translate.user_info_card.level}</label>
                            <div className={styles.levelDisplay}>{user.level}</div>
                        </div>

                        <CircleChart data={taskData} />
                </div>

                <div className={styles.jobCharacter}>
                    <img 
                        src={getJobImage(user.job.id)} 
                        alt="Character"
                        className={styles.characterImage}
                    />
                </div>
            </div>

            <div className={`${styles.levelUpInformations} col-start-5 col-end-6 row-start-4 row-end-6`}>
                <span className={styles.levelUpTitle}>{translate.user_level_up.level_up || 'Level up !'}</span>
                <div className={styles.skillsContainer}>
                    {/* TODO: a modifier dynamiquement */}
                    <span className="">A compléter</span>
                </div>
            </div>
        </>
    );
}