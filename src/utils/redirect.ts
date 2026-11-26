import { ROUTES } from "../constants/routes";

export const REDIRECT_PARAM = "redirect";

/** Only same-site paths are followed, so a crafted link cannot send the user elsewhere. */
export function getRedirectTarget(searchParams: URLSearchParams): string {
    const target = searchParams.get(REDIRECT_PARAM);
    const isLocalPath =
        target?.startsWith("/") && !target.startsWith("//") && !target.includes("\\");
    return isLocalPath ? target! : ROUTES.home;
}

export const logInPathWithRedirect = (target: string) =>
    `${ROUTES.logIn}?${REDIRECT_PARAM}=${encodeURIComponent(target)}`;
