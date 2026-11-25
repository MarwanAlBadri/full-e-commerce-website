import Container from "../components/ui/Container";

export default function Placeholder({ title }: { title: string }) {
    return (
        <Container className="py-20">
            <h1 className="font-inter text-heading-small font-semibold">{title}</h1>
        </Container>
    );
}
