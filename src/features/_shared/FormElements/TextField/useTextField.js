import { useState } from 'react'
import cheatyReducer from '../../../../assets/cheatyReducer'

export default function useTextField(min, max, initialValue = "") {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    const onChange = (newValue) => {
        newValue = newValue.length === 1 ? newValue.toUpperCase() : newValue;
        let error = "";

        if (min && newValue.length < min) {
            error = `Minst ${min} tecken`;
        }
        else if (max && newValue.length > max) {
            error = `Max ${min} tecken`;
        }
        // else if (pattern && !pattern.test(newValue)) {
        //     error = "Fältet innehåller felaktiga uppgifter";
        // }

        setValue(newValue);
        setError(error);

        return error;
    }

    const reset = () => {
        setValue("");
        setError("");
    }

    return {
        value,
        error,
        onChange,
        reset
    }
}
