import axios from '../../assets/js/axios'

const state = { // 存储状态值
  listing:[]
};

const getters = { // Getters接收state作为其第一个函数

};

// 状态值的改变方法,操作状态值
// 提交mutations是更改Vuex状态的唯一方法
const mutations = {
    banner_state(state,payload){
        for(let[key,value] of Object.entries(payload)){
            state[key] = value;
        }
    }
};

const actions = {
    banner_listing({commit,state}){
        if(state.listing.length) return Promise.resolve(state.listing);
        return new Promise((res,rej)=>{
            axios.get('banners').then(ret=>{
                commit('banner_state',{listing:ret.data});
                res(ret.data);
            }).catch(err=>rej(err.data));
        });
    }
};

export default {state,getters,mutations,actions};
