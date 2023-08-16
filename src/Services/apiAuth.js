import axios from 'axios'

const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

function login(body) {
    const promise = axios.post(`${REACT_APP_DATABASE_URL}/`, body)
    return promise
}

function signup(body) {
    const promise = axios.post(`${REACT_APP_DATABASE_URL}/signUp`, body)
    return promise
}

const apiAuth ={ login, signup }
 export default apiAuth