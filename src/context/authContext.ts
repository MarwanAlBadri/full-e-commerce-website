import { createContext } from "react";
import type { ProfileUpdate } from "../services/authService";
import type { User } from "../types/user";
import type { LogInValues, SignUpValues } from "../utils/validation";

export interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    signUp: (values: SignUpValues) => Promise<void>;
    logIn: (values: LogInValues) => Promise<void>;
    logOut: () => void;
    updateProfile: (update: ProfileUpdate) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
