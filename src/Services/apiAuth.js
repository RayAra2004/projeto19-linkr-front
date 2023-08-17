import axios from 'axios'



function login(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/`, body)
    console.log(promise)
    return promise
}

function signup(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
    console.log(promise)
    return promise
}

const apiAuth = { login, signup }
export default apiAuth