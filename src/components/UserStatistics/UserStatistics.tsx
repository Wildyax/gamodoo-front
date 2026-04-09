'use client';
import { useAuth } from "@/src/context/AuthContext";
import styles from "./UserStatistics.module.css";
import translate from "../../locales/fr.json";
import ProgressBarProps from "../ProgressBar/ProgressBar";
import CircleChart from "../CircleChart/CircleChart";
import { useEffect, useState } from "react";
import { getExperienceByUserLevel } from "@/src/services/experience.service";

const getJobImage = (jobId: string | number): string => {
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

export default function UserStatistics({ todoCount, doneCount }: { todoCount: number, doneCount: number }) {
    const { user, token } = useAuth();
    const [maxXp, setMaxXp] = useState<number | null>(null);
    if (!user) return null;

    useEffect(() => {
        if (!user || !token) return;
        
        getExperienceByUserLevel(user, token)
            .then((exp) => exp && setMaxXp(exp.exp))
            .catch(console.error);
    }, [user, token]);

    const taskData = [
        { name: translate.user_info_card.to_do, value: todoCount, fill: '#CDA47B' },
        { name: translate.user_info_card.realised, value: doneCount, fill: '#38170E' },
    ];

    const currentLevelXp = maxXp ? user.exp % maxXp : 0;

    return (
        <>
            <div className={`${styles.bossInformations} col-start-5 col-end-6 row-start-4 row-end-6`}>
                <span className={styles.bossTitle}>{translate.boss_access.next || 'Next boss !'}</span>
                <div className={styles.bossContainer}>
                    <span className="">A compléter</span>
                </div>
            </div>
            <div className={`${styles.userInformations} col-start-5 col-end-6 row-start-1 row-end-4`}>
                <span className={styles.greeting}>{translate.user_info_card.hello} {user.login} !</span>

                <div className={styles.statsWrapper}>
                    
                    <div className={styles.statItem}>
                        <label className={styles.statLabel}>{translate.user_info_card.level}</label>
                        <div className={styles.levelDisplay}>{user.level}</div>
                    </div>

                    <div className={styles.statItem}>
                        <label className={styles.statLabel}>{translate.user_info_card.xp}</label>
                        {maxXp ? (
                            <ProgressBarProps current={currentLevelXp} max={maxXp} label="" />
                        ) : (
                            <span>Chargement...</span>
                        )}
                    </div>

                    {(todoCount + doneCount) > 0 && <CircleChart data={taskData} height={180} />}
                </div>

                <div className={styles.jobCharacter}>
                    <img 
                        src={getJobImage(user.job.id)} 
                        alt="Character"
                        className={styles.characterImage}
                    />
                </div>
            </div>
        </>
    );
}