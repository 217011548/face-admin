import {Axios} from '../index'
import baseMethod from '../baseMethod'
const _mod = '/admin/appUpdate'
export default{
    ...baseMethod(_mod),
    getList(params){
        return Axios.get(`${_mod}/list`,{params})
    },
    apkInfo(params){
        return Axios.get(`${_mod}/apkInfo`,{params})
    },
    
}