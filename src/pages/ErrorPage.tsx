import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { ROUTES } from "../constants/routes";

/** Shown instead of a page that crashed, keeping the header and footer usable. */
export default function ErrorPage() {
    return (
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
            <h1 className="font-inter text-heading-small font-semibold">Something went wrong</h1>
            <p className="text-mid">
                Reload the page. If it happens again, go back to the home page.
            </p>
            <Button onClick={() => window.location.assign(ROUTES.home)}>Back to home page</Button>
        </Container>
    );
}
