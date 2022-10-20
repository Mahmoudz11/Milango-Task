import { CHANGE_THEME_STYLE } from "../constants/constants";

const INITIAL_STATE = {
    mode : 'light'
}

const themeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_THEME_STYLE:
            return {
                ...state,
                mode : action.data
            }
    
        default:
            return state
    }
}

export default themeReducer