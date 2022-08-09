import {Axios} from '../index'
import baseMethod from '../baseMethod'
const _mod = '/admin/user'
export default{
    ...baseMethod(_mod),
    searchList(params){
        return Axios.get(`${_mod}/searchList`,{params})
    },
}