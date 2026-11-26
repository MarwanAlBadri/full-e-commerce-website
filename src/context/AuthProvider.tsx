import { useState, type ReactNode } from "react";
import * as authService from "../services/authService";
import { AuthContext, type AuthContextValue } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(authService.getCurrentUser);

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
