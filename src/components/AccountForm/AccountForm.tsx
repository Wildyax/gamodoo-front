"use client";

import styles from "./AccountForm.module.css";
import translate from "../../locales/fr.json";

type AccountProps = {
  onSubmit: (data: {
    email: string;
    password: string;
    login?: string;
    //TODO: ajouter la sélection de perso + champs token
  }) => void;
  withoutLogin: boolean;
  selectedCharacter: string | null;
};

export default function AccountForm({ onSubmit, withoutLogin, selectedCharacter }: AccountProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data as any);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>
        {withoutLogin
          ? translate.account.connexion.title
          : translate.account.create.title}
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        {!withoutLogin && (
          <>
            <label>{translate.account.create.login}</label>
            <input
              type="text"
              name="login"
              className={styles.input}
              required
            />
          </>
        )}

        <label>{translate.account.create.mail}</label>
        <input
          type="email"
          name="email"
          className={styles.input}
          required
        />

        <label>{translate.account.create.password}</label>
        <input
          type="password"
          name="password"
          className={styles.input}
          required
        />

        <button
          className="
            px-3 py-1.5
            text-sm font-medium
            rounded-md
            shadow-md
            text-white
            flex items-center justify-center
            whitespace-nowrap
            transition-all duration-150
            hover:shadow-lg
            hover:brightness-110
            active:scale-95
          "
          style={{ background: `var(--gradient-red)` }}
          type="submit"
        >
          {withoutLogin
            ? translate.account.connexion.submit
            : translate.account.create.submit}
        </button>
      </form>
    </div>
  );
}
