import axios from "axios"
const instance = axios.create({
    baseURL:"https://to-do-eight-indol.vercel.app/api"
})
export default instance