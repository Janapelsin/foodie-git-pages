export default function cheatyReducer(state, newState) {
    return { ...state, ...newState };
}