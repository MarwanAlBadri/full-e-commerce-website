import { useEffect, useState, type ReactNode } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import * as authService from "../services/authService";
import { AuthContext, type AuthContextValue } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(authService.getCurrentUser);

    // Logging in or out in another tab applies here too.
    useEffect(() => {
        const syncSession = ({ key }: StorageEvent) => {
            // A null key means the whole storage was cleared.
            if (key === STORAGE_KEYS.session || key === null) {
                setUser(authService.getCurrentUser());
            }
        };
        window.addEventListener("storage", syncSession);
        return () => window.removeEventListener("storage", syncSession);
    }, []);

    const value: AuthContextValue = {
        user,
        isAuthenticated: user !== null,
        signUp: async (values) => setUser(await authService.signUp(values)),
        logIn: async (values) => setUser(await authService.logIn(values)),
        logOut: () => {
            authService.logOut();
            setUser(null);
        },
        updateProfile: async (update) => {
            if (user) setUser(await authService.updateProfile(user.id, update));
        },
    };

    return <AuthContext value={value}>{children}</AuthContext>;
}
