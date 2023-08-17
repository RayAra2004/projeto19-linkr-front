import axios from 'axios'

const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

function login(body) {
    const promise = axios.post(`${REACT_APP_DATABASE_URL}/`, body)
    console.log(promise)
    return promise
}

function signup(body) {
    const promise = axios.post(`${REACT_APP_DATABASE_URL}/sign-up`, body)
    console.log(promise)
    return promise
}

const apiAuth = { login, signup }
export default apiAuth