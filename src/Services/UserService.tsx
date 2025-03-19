import axios from 'axios'

const base_url = "http://localhost:8080/users/"

const registerUser = async (user:any) => {
    return axios.post(`${base_url}register`, user)
            .then(res => res.data)
            .catch(error => {throw error});
}

const loginUser = async (login:any) => {
    return axios.post(`${base_url}login`, login)
            .then(res => res.data)
            .catch(error => {throw error});
}

const sendOtp = async (email:any) => {
    return axios.post(`${base_url}sendOtp/${email}`)
            .then(result => result.data)
            .catch(error => {throw error});
}

const verfiyOtp = async(email:any, otp:any) => {
    return axios.get(`${base_url}verifyOtp/${email}/${otp}`)
            .then(result => result.data)
            .catch(error => {throw error});
}

const changePass = async( email:any, password:any)=>{
    const changePassData={email, password}
    return axios.post(`${base_url}changePass`, changePassData ) 
            .then(result => {
                console.log('result:')
                console.log(result)
                return result.data})
            .catch(error => {throw error});
}

export {registerUser, loginUser, sendOtp, verfiyOtp, changePass}