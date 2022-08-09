import {Axios} from '../index'
import baseMethod from '../baseMethod'
const _mod = '/admin/news'
export default{
    ...baseMethod(_mod),
    getList(params){
        return Axios.get(`${_mod}/list`,{params})
    },
}