import { useState, useEffect } from 'react'

export default function useColorPicker() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onChange = (newValue) => {
        let error = "";

        if (!newValue) {
            error = "Välj en färg"
        }

        setValue(newValue);
        setError(error);

        return error;
    }

    const reset = () => {
        setValue("");
        setError("");
    }

    return { value, error, onChange, reset }
}
