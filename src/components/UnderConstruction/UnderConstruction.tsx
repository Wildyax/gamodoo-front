import styles from './UnderConstruction.module.css';

export default function UnderConstruction() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.screen}>
                    <p className={styles.line}>
                        <span className={styles.tag}>[SYS]</span>
                        <span className={styles.tag}> STATUT PAGE</span>
                        <span className={styles.dots}>.................</span>
                        <span className={styles.warning}>EN COURS</span>
                    </p>
                    <p className={styles.line}>
                        <span className={styles.tag}>[SYS]</span>
                        <span className={styles.tag}> DATE LIVRAISON</span>
                        <span className={styles.dots}>...............</span>
                        <span className={styles.danger}>INCONNUE</span>
                    </p>
                    <p className={styles.line} style={{ marginBottom: '1rem' }}>
                        <span className={styles.tag}>[SYS]</span>
                        <span className={styles.tag}> CAFÉ CONSOMMÉ</span>
                        <span className={styles.dots}>...............</span>
                        ∞ TASSES
                    </p>
                <div className={styles.divider} />
                    <p className={styles.muted}>&gt; Cette page est en cours de construction...</p>
                    <p className={styles.muted}>&gt; Revenez bientôt.<span className={styles.cursor}>█</span></p>
                </div>
            </div>
        </>
    );
}