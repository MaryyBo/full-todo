import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
    isLightMode: true // показуємо світлу тему
}

const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_THEME: {
            return {
                ...state,
                isLightMode: !state.isLightMode // Стане false
            }
        }
        default: return state
    }

}

export default themesReducer;