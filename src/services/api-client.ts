import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '878cda36bca64d758fc43f2509dfa807'
    }
})