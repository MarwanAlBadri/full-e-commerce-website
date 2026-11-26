import { useState, type ChangeEvent, type FormEvent } from "react";
import { hasErrors, type FormErrors } from "../utils/validation";

/**
 * Controlled form state with validation on submit. A field's error disappears as soon as the
 * user edits it.
 */
export function useFormState<Values extends object>(
    initialValues: Values,
    validate: (values: Values) => FormErrors<Values>,
) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<FormErrors<Values>>({});

    /** Props to spread on an input or textarea bound to `name`. */
    const field = (name: keyof Values & string) => ({
        name,
        value: String(values[name] ?? ""),
        error: errors[name],
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target;
            setValues((current) => ({ ...current, [name]: value }));
            setErrors((current) => ({ ...current, [name]: undefined }));
        },
    });

    const handleSubmit = (onValid: (values: Values) => void) => (event: FormEvent) => {
        event.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (!hasErrors(found)) onValid(values);
    };

    return { values, setValues, field, handleSubmit };
}
