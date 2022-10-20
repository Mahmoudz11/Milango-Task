import { GET_DATA, GET_LANG, LOADING_DATA,  } from "../constants/constants";

const INITIAL_STATE = {
    isLoading : false,
    repoData : [],
    progLang : []
}

const getDataReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state, 
                isLoading : action.data
            }
        case GET_DATA:
            return {
                ...state,
                repoData : action.data
            }
        case GET_LANG:
            return {
                ...state,
                progLang : action.data
            }
        default:
            return state
    }
}

export default getDataReducer