import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cheatyReducer from '../../../assets/cheatyReducer';
import { DELETE_FAILED, CONFIRM_FAILED } from '../../../store/statusTypes';

export default function useList(items, status = "") {
    const { currentUserId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [state, setState] = React.useReducer(cheatyReducer, {
        listItems: items,
        removeId: ""
    });

    React.useEffect(() => {
        if (status === DELETE_FAILED) {
            // notify user
        }
        else if (status === CONFIRM_FAILED) {
            // notify user
        }
    }, [status])

    React.useEffect(() => {
        if (!state.removeId) {
            setState({ listItems: items })
        }
        // Wait for transitions (reset + remove) to complete
        else {
            setTimeout(() => {
                setState({
                    removeId: "",
                    listItems: items
                });
            }, 590)
        }
    }, [items])

    const handleRemove = (item, callback) => {
        setState({ removeId: item.id });
        dispatch(callback(item, currentUserId));
    }

    return {
        ...state, handleRemove
    }
}
