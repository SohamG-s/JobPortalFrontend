import axios from 'axios'

const base_url = "http://localhost:8080/notification/";

const getNotifications = async (id:any) => {
    return axios.get(`${base_url}get/${id}`)
            .then(res => res.data)
            .catch(error => {throw error});
}

const readNotification = async (id:any) => {
    return axios.put(`${base_url}read/${id}`)
            .then(result => result.data)
            .catch(error => {throw error;});
}


export {getNotifications,readNotification};