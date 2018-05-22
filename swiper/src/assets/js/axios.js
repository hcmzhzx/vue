import axios from 'axios'
import {API_URL} from './env'
import layer from 'layer-mobile'

//初始化axios
axios.defaults.baseURL=`${API_URL}/wechat/`;
//请求拦截
axios.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
});
//响应拦截
axios.interceptors.response.use(res=>{
    if(typeof res.headers.authorization !== 'undefined'){
        localStorage.setItem('token',res.headers.authorization);
    }
    return res.data;
},err=>{
    const errData = err.response.data;
    if(localStorage.getItem('token')) {
        layer.open({
            content: errData.msg,
            skin: 'msg',
            time: 3
        });
    }
    return Promise.reject(errData);
});

export default axios;
