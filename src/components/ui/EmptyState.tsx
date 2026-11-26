import { ROUTES } from "../../constants/routes";
import Button from "./Button";

interface EmptyStateProps {
    title: string;
    message: string;
    actionLabel?: string;
}

export default function EmptyState({
    title,
    message,
    actionLabel = "Return To Shop",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-16 text-center">
            <h2 className="text-xl leading-7 font-semibold">{title}</h2>
            <p className="max-w-[420px] text-mid leading-6 text-text-black/60">{message}</p>
            <Button to={ROUTES.home}>{actionLabel}</Button>
        </div>
    );
}
