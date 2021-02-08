import { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cheatyReducer from '../../assets/cheatyReducer';

const DEFAULT_LIST_HEIGHT = window.innerHeight - 80;

export default function useLayout(defaultSearchHeight, defaultFormHeight) {
    const { searchActive, formActive } = useSelector(s => s.navigation);
    const [state, setState] = useReducer(cheatyReducer, {
        actionsHeight: 0,
        listHeight: DEFAULT_LIST_HEIGHT
    });

    // Default toggle
    useEffect(() => {
        if (searchActive) {
            setState({ actionsHeight: defaultSearchHeight });
        }
        else if (formActive) {
            setState({ actionsHeight: defaultFormHeight });
        }
        else {
            setState({ actionsHeight: 0 });
        }
    }, [searchActive, formActive, defaultSearchHeight, defaultFormHeight]);

    // Adjust list height
    useEffect(() => {
        setState({ listHeight: DEFAULT_LIST_HEIGHT - state.actionsHeight });
    }, [state.actionsHeight]);

    // Manually set actions height
    const updateActionsHeight = (newHeight) => {
        setState({ actionsHeight: newHeight });
    }

    return {
        ...state,
        searchActive: searchActive,
        formActive: formActive,
        updateActionsHeight
    };
}
