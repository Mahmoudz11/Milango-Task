import { CHANGE_THEME_STYLE } from "../constants/constants";

export const switchMode = data => {
    return dispatch => {
        dispatch({
            type : CHANGE_THEME_STYLE,
            data : data
        })
    }
}