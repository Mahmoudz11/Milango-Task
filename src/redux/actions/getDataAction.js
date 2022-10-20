import { GET_DATA, GET_LANG, LOADING_DATA } from "../constants/constants";

export const isLoadinAction = data => {
    return dispatch => {
        dispatch({
            type : LOADING_DATA,
            data : data
        })
    }
}

export const getDataAction = data => {
    return dispatch => {
        dispatch({
            type : GET_DATA,
            data : data
        })
    }
}

export const getProgLangAction = data => {
    return dispatch => {
        dispatch({
            type : GET_LANG,
            data : data
        })
    }
}