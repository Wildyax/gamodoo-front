'use client'
import { useState } from 'react';
import style from './TaskModal.module.css';
import translate from "@/src/locales/fr.json";
import { createTask } from "@/src/services/task.service";
import { MdClose } from 'react-icons/md';
import { TaskData } from '@/src/models/Task';

const LEVEL_COUNT = 5;

interface TaskModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: ((task: any) => void) | null;
    onDelete?: () => void;
    onUpdate?: (data: any) => void;
    readOnly?: boolean;
    task?: TaskData | null;
}

export default function TaskModal({ isOpen = false, onClose = () => {}, onSubmit = null, onDelete, onUpdate, readOnly = false, task = null }: TaskModalProps) {
    const [taskLabel, setTaskLabel] = useState(task?.label ?? '');
    const [taskDescription, setTaskDescription] = useState(task?.description ?? '');
    const [taskLevel, setTaskLevel] = useState(task?.difficulty ?? 0);
    const [taskTags, setTaskTags] = useState<string[]>(task?.tags ?? []);
    const [tagInput, setTagInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const isReadOnly = readOnly && !isEditing;

    const handleClose = (e: any) => {
        e.preventDefault();
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setTaskLabel('');
        setTaskDescription('');
        setTaskLevel(0);
        setTaskTags([]);
        setTagInput('');
        setError('');
        setIsEditing(false);
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() && taskTags.length < 5) {
            e.preventDefault();
            setTaskTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setTaskTags(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!taskLabel.trim()) {
            setError('Le titre est requis');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const newTask = await createTask({
                label: taskLabel,
                description: taskDescription,
                tags: taskTags,
                checked: false,
                difficulty: taskLevel,
            });

            onSubmit?.(newTask);
            resetForm();
            onClose();
        } catch (err) {
            setError('Erreur lors de la création de la tâche');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!taskLabel.trim()) {
            setError('Le titre est requis');
            return;
        }
        setIsLoading(true);
        try {
            await onUpdate?.({
                label: taskLabel,
                description: taskDescription,
                tags: taskTags,
                checked: task?.checked ?? false,
                difficulty: taskLevel,
            });
            setIsEditing(false);
        } catch (err) {
            setError('Erreur lors de la modification');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={style.modalOverlay} onClick={handleClose}>
                <div className={style.modalWrapper} onClick={e => e.stopPropagation()}>
                    <div className={style.modal}>
                        <div className={style.modalHeader}>
                            <input
                                className={style.modalTitle}
                                type="text"
                                placeholder={translate.modal.title}
                                value={taskLabel}
                                onChange={e => !isReadOnly && setTaskLabel(e.target.value)}
                                readOnly={isReadOnly}
                            />
                            <a onClick={handleClose}>X</a>
                        </div>

                        <div className={style.levelSelection}>
                            <span>{translate.modal.task_level}</span>
                            <div className={style.dots}>
                                {Array.from({ length: LEVEL_COUNT }, (_, i) => {
                                    const dotLevel = LEVEL_COUNT - i;
                                    return (
                                        <span
                                            key={i}
                                            className={dotLevel <= taskLevel ? style.dotInactive : style.dotActive}
                                            onClick={() => !readOnly && setTaskLevel(dotLevel === taskLevel ? 0 : dotLevel)}
                                            role="button"
                                            aria-label={`Level ${dotLevel}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className={style.modalContent}>
                            <div className={style.descriptionContainer}>
                                <label htmlFor='description' className={style.title}>
                                    {translate.modal.task_title_description}
                                </label>
                                <textarea
                                    id='description'
                                    className={style.descriptionInput}
                                    placeholder={translate.modal.task_description}
                                    value={taskDescription}
                                    onChange={e => !isReadOnly && setTaskDescription(e.target.value)}
                                    readOnly={isReadOnly}
                                />
                                {!isReadOnly && taskTags.length >= 5 && (
                                    <div className={style.error}>
                                        <span>{translate.modal.tag_limit}</span>
                                    </div>
                                )}
                            </div>

                            <div className={style.tagContainer}>
                                <label htmlFor='tags' className={style.title}>
                                    {translate.modal.tag_title}
                                </label>
                                <div className={style.tagsList}>
                                    {taskTags.slice(0, 6).map((tag, i) => (
                                        <span key={i} className={style.tag}>
                                            {tag}
                                            {!isReadOnly && (
                                                <button className={style.removeButton} onClick={() => handleRemoveTag(i)}>
                                                    <MdClose size={16} />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                {!isReadOnly && (
                                    <input
                                        id='tags'
                                        className={style.descriptionInput}
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder={translate.modal.tag_placeholder}
                                    />
                                )}
                            </div>

                            {error && !isReadOnly && <div className={style.error}><span>{error}</span></div>}

                            {readOnly && (
                                <div className={style.readOnlyButtons}>
                                    {isEditing ? (
                                        <div className={style.submitContainer}>
                                            <button className={style.submitButton} onClick={handleUpdate} disabled={isLoading}>
                                                {isLoading ? 'Chargement...' : 'Sauvegarder'}
                                            </button>
                                        </div>
                                    ) : (
                                        onUpdate && (
                                            <div className={style.submitContainer}>
                                                <button className={style.submitButton} onClick={() => setIsEditing(true)}>
                                                    Modifier
                                                </button>
                                            </div>
                                        )
                                    )}
                                    {onDelete && !isEditing && (
                                        <div className={`${style.submitContainer} ${style.deleteButton}`}>
                                            <button className={style.submitButton} onClick={onDelete}>
                                                Supprimer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!readOnly && (
                                <div className={style.submitContainer}>
                                    <button
                                        className={style.submitButton}
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Chargement...' : translate.modal.submit}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}