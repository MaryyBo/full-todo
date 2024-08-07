import ACTION_TYPES from './actions/actionTypes'

const initialState = {
    user: null,
    tasks: [],
    isLoading: false,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) { // яка б помилка не прийшла: ми будемо виконувати одну обробку помилки
        case ACTION_TYPES.LOGIN_USER_ERROR:
        case ACTION_TYPES.REGISTER_USER_ERROR:
        case ACTION_TYPES.GET_TASKS_ERROR:
        case ACTION_TYPES.CREATE_TASK_ERROR:
        case ACTION_TYPES.DELETE_TASK_ERROR:
        case ACTION_TYPES.AUTH_USER_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    error: payload,
                    isLoading: false
                }

            }

        case ACTION_TYPES.LOGIN_USER_REQUEST:
        case ACTION_TYPES.REGISTER_USER_REQUEST:
        case ACTION_TYPES.GET_TASKS_REQUEST:
        case ACTION_TYPES.CREATE_TASK_REQUEST:
        case ACTION_TYPES.DELETE_TASK_REQUEST:
            {
                return {
                    ...state,
                    isLoading: true
                }
            }


        case ACTION_TYPES.LOGIN_USER_SUCCESS:
        case ACTION_TYPES.REGISTER_USER_SUCCESS:
        case ACTION_TYPES.AUTH_USER_SUCCESS:
            {
                const { payload } = action;
                return {
                    ...state,
                    user: payload,
                    isLoading: false,
                    error: null
                }
            }

        case ACTION_TYPES.GET_TASKS_SUCCESS:
            {
                const { payload } = action;
                return {
                    ...state,
                    tasks: payload,
                    isLoading: false,
                    error: null
                }
            }

        case ACTION_TYPES.CREATE_TASK_SUCCESS:
            {
                const { payload: newTask } = action;
                return {
                    ...state,
                    tasks: [...tasks, newTask],
                    isLoading: false,
                    error: null
                }
            }

        case ACTION_TYPES.DELETE_TASK_SUCCESS:
            {
                const { payload: deletedTask } = action;
                const filteredTasks = state.tasks.filter(td => td._id !== deletedTask._id);
                return {
                    ...state,
                    tasks: filteredTasks,
                    isLoading: false,
                    error: null
                }
            }

        case ACTION_TYPES.LOG_OUT_REQUEST:
            {
                return {
                    ...initialState
                }
            }

        default: {
            return state
        }
    }
}

export default reducer;