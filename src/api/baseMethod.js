import { Axios } from './index'
export default (control) => {
    return {
        getPage(params) {
            return Axios.get(`${control}/page`, { params })
        },
        save(data) {
            return Axios.post(`${control}/save`, data)
        },
        update(data) {
            return Axios.post(`${control}/update`, data)
        },
        del(data) {
            return Axios.post(`${control}/delete`, data)
        }
    }
}