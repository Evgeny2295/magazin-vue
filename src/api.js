import {ref} from "vue";
import axios from "axios";
import {router} from "@/router/router.js";

const api = ref('')

api.value = axios.create()

//start request
api.value.interceptors.request.use(config=> {

    if(localStorage.access_token){
        config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
}, function (error) {
    // Сделайте что-нибудь с ошибкой запроса
});
//endRequest

// Добавляем перехват ответов
api.value.interceptors.response.use(config=> {

    if(localStorage.access_token){
        config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
}, async error=> {

    if(error.response.data.message === 'Token has expired'){

        const {data} = await axios.post('http://localhost:8881/api/auth/refresh',{},{
            headers:{
                'Authorization': `Bearer ${localStorage.access_token}`
            }
        })

        localStorage.access_token = data.access_token
        error.config.authorization = `Bearer ${localStorage.access_token}`
        return api.value.request(error.config)
    }


});

export default api