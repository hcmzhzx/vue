import axios from '../../assets/js/axios'

const state = {
    goods:[],
    address:0
};

const getters = {
    shopGoods(state){
        if(state.goods.length) return state.goods;
        return JSON.parse(localStorage.getItem('shopGoods'));
    },
    shopAddress(state){
        if(state.address>0) return state.address;
        return localStorage.getItem('shopAddress');
    }
};

const mutations = {
    shop_state(state,payload){
        for(let[key,val] of Object.entries(payload)){
            state[key] = val;
        }
    },
    shop_goods(state,payload){
        state.goods = payload;
        localStorage.setItem('shopGoods',JSON.stringify(payload));
    },
    shop_address(state,payload){
        state.address = payload;
        localStorage.setItem('shopAddress',payload);
    }
};

const actions = {

};

export default {state,getters,mutations,actions};
