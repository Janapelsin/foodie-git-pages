import { useReducer, useEffect } from 'react'
import cheatyReducer from '../../../assets/cheatyReducer';
import { useSelector } from 'react-redux';

export default function useSearch(items) {
    // Maybe just pass this as an argument
    const { searchActive } = useSelector(s => s.navigation);
    
    const [state, setState] = useReducer(cheatyReducer, {
        value: "",
        results: items
    });

    useEffect(() => {
        onChange(state.value);
    }, [items])

    useEffect(() => {
        if (!searchActive) {
            setState({ value: "", results: items });
        }
    }, [searchActive])

    const onChange = (newValue) => {
        newValue = newValue.length === 1 ? newValue.toUpperCase() : newValue;

        setState({
            value: newValue,
            results: newValue
                ? items.filter(i => i.name.toUpperCase().startsWith(newValue.toUpperCase()))
                : items
        });
    }

    return {
        input: { value: state.value, onChange },
        results: state.results,
    }
}
