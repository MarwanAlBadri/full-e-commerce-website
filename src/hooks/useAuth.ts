import { AuthContext } from "../context/authContext";
import { useRequiredContext } from "./useRequiredContext";

export const useAuth = () => useRequiredContext(AuthContext, "useAuth");
