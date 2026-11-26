import Breadcrumbs from "../components/ui/Breadcrumbs";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
    return (
        <Container className="pb-16 lg:pb-[140px]">
            <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "404 Error" }]} />
            <div className="flex flex-col items-center gap-10 text-center lg:py-10">
                <h1 className="font-inter text-[56px] leading-tight font-medium tracking-[3px] md:text-[110px] md:leading-[115px]">
                    404 Not Found
                </h1>
                <p className="text-mid leading-6">
                    Your visited page not found. You may go home page.
                </p>
                <Button to={ROUTES.home} className="mt-6">
                    Back to home page
                </Button>
            </div>
        </Container>
    );
}
