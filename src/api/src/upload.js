import {Axios} from '../index'
const _mod = '/admin/upload'
export default{
    uploadFiles(data){
        return Axios.post(`${_mod}/files`,data)
    },
}