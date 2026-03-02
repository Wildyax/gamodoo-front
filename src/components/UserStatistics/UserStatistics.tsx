import { useAuth } from "@/src/context/AuthContext";

export default function UserStatistics() {
    const { user } = useAuth();
    
    return (
        <>
            <div className="col-start-5 col-end-6 row-start-1 row-end-4">
                {user?.login}
            </div>
            <div className="col-start-5 col-end-6 row-start-4 row-end-6">
                salut 2
            </div>
        </>
    );
}