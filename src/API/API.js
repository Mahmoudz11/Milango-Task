import axios from "axios";
import { setFilteredRepoAction } from "../redux/actions/filterDataAction";
import { isLoadinAction, getDataAction, getProgLangAction } from '../redux/actions/getDataAction';

const base = 'https://api.github.com/search/repositories?q=created:%3E2019-01-10&sort=stars&order=desc'

export const fetchData = async (dispatch) => {
    const id = () => {
        return  Math.random().toString(36).substr(2, 9);
    }
    const localLang = []
    try {
        await isLoadinAction(true)
        await axios.get(base)
        .then(async res => {
            await dispatch(getDataAction(res.data.items))
            for (const d of res.data.items) {
                if (!localLang.includes(d.language) && d.language !== null) {
                    localLang.push({id : id(), langName : d.language})
                } 
            }
            const key = 'langName'
            const arrayUniqueByKey = [...new Map(localLang.map(item =>
                [item[key], item])).values()];
            await dispatch(getProgLangAction(arrayUniqueByKey))
            await dispatch(setFilteredRepoAction(res.data.items))
            await isLoadinAction(false)
        })
    } catch (error) {
        console.log(error);
    }
}