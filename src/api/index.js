import {mainParams, TOKEN} from "../common/constants";
import axios from "axios";

export default class Api {

    static login(data){
        const bodyFormData = new FormData();
        bodyFormData.set('username', data.username);
        bodyFormData.set('password', data.password);
        return axios({
            method: 'post',
            url: `${mainParams.apiUrl}/api/auth/login`,
            data: bodyFormData
        })
    }

    static postTask(data){
        const bodyFormData = new FormData();
        bodyFormData.set('email', data.email);
        bodyFormData.set('text', data.text);
        bodyFormData.set('username', data.username);
        return axios({
            method: 'post',
            url: `${mainParams.apiUrl}/api/tasks`,
            data: bodyFormData
        })
    }

    static editTask(data){
        const bodyFormData = new FormData();
        bodyFormData.set('text', data.newValue);
        bodyFormData.set('status', 10);
        return axios({
            method: 'post',
            headers: {Authorization: ` Bearer ${localStorage.getItem(TOKEN)}`},
            url: `${mainParams.apiUrl}/api/tasks/edit/${data._id}`,
            data: bodyFormData
        })
    }

    static getTasks(){
        return axios(`${mainParams.apiUrl}/api/tasks`)
    }

    static logout(){
        return axios(`${mainParams.apiUrl}/api/auth/logout`, {headers: {Authorization: `Bearer ${localStorage.getItem(TOKEN)}`}})
    }
}

