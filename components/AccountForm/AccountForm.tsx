'use client'; 

type AccountProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  withoutLogin: boolean;
};

export default function Account({onSubmit, withoutLogin}: AccountProps) {

    return (
        <form onSubmit={onSubmit}>
            <label>Login</label>
            <input 
                type="text" 
                name="login"
                className={withoutLogin ? "disabled" : "enabled"} 
                disabled={withoutLogin}
            />

            <label>Email</label>
            <input type="text" name="email"></input>

            <label>Mot de passe</label>
            <input 
                type="password" 
                name="password"
            />
            <button type="submit">Submit</button>
        </form>
    )
}