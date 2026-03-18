'use client'
import { useState } from 'react';
import style from './TaskModal.module.css';
import translate from "@/src/locales/fr.json";

export default function TaskModal({isOpen = false, onClose = () => {}, onSubmit = null}) {
    const [taskLabel, setTaskLabel] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLevel, setTaskLevel] = useState(0);
    const [taskTags, setTaskTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const checked = false;

    const handleClose = (e: any) => {
        e.preventDefault();
        setTaskLabel('');
        setTaskDescription('');
        setTaskLevel(0);
        setTaskTags([]);
        onClose();
  };

    return (
        <>
            <div className={style.modalOverlay} onClick={handleClose}>
                <div className={style.modalWrapper}>
                    <div className={style.modal}>
                        <div className={style.modalHeader}>
                            <input 
                                className={style.modalTitle}
                                type="text"
                                placeholder={translate.modal.title}
                            />
                            <a onClick={handleClose}>
                                X
                            </a>
                        </div>
                        <div className={style.levelSelection}>
                            <span>{translate.modal.task_level}</span>
                            <div className={style.levelOptions}>
                               tasks
                            </div>
                        </div>
                        <div className={style.modalContent}>
                            <div className={style.descriptionContainer}>
                                <label htmlFor='description' className={style.title}>{translate.modal.task_title_description}</label>
                                <textarea 
                                    id='description'
                                    className={style.descriptionInput}
                                    placeholder={translate.modal.task_description}
                                />
                            </div>
                            <div className={style.tagsContainer}>
                                <label htmlFor='tags' className={style.title}>{translate.modal.tag_title}</label>
                                <input 
                                    id='tags'
                                    className={style.descriptionInput}
                                />
                            </div>
                            <div className={style.submitContainer}>
                                <button className={style.submitButton}>{translate.modal.submit}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}