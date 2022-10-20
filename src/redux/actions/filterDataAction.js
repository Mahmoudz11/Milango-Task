import { SET_CURRENT_DATE, SET_CURRENT_PROG_LANGUAGE, SET_FILTERED_LANG_DATA, SET_FILTERED_REPO_LANG_DATA } from "../constants/constants"

export const setProgLangAction = data => {
    return dispatch => {
        dispatch({
            type : SET_CURRENT_PROG_LANGUAGE,
            data : data
        })
    }
}

export const setFilteredLangAction = data => {
    return dispatch => {
        dispatch({
            type : SET_FILTERED_LANG_DATA,
            data : data
        })
    }
}

export const setFilteredRepoAction = data => {
    return dispatch => {
        dispatch({
            type : SET_FILTERED_REPO_LANG_DATA,
            data : data
        })
    }
}

export const setCurrentDateAction = data => {
    return dispatch => {
        dispatch({
            type : SET_CURRENT_DATE,
            data : data
        })
    }
}