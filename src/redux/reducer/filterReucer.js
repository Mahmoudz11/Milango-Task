import { SET_CURRENT_DATE, SET_CURRENT_PROG_LANGUAGE, SET_FILTERED_LANG_DATA, SET_FILTERED_REPO_LANG_DATA } from "../constants/constants"

const INITIAL_STATE = {
    currentProgLang : 'Any',
    filteredLangData : [],
    filteredRepoByLang : [],
    currentDate : new Date()
}

const filterReucer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_PROG_LANGUAGE:
            return {
                ...state,
                currentProgLang : action.data
            }
        case SET_FILTERED_LANG_DATA:
            return {
                ...state,
                filteredLangData : action.data
            }
        case SET_FILTERED_REPO_LANG_DATA:
            return {
                ...state,
                filteredRepoByLang : action.data
            }
        case SET_CURRENT_DATE:
            return {
                ...state,
                currentDate : action.data
            }
        default:
            return state
    }
}

export default filterReucer