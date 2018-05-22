import axios from '../../assets/js/axios'

const state = {
    listing:[]
};

const getters = {
    findOrderById(state){
        return (id) => {
            return state.listing.find(item => item.id==id);
        }
    },
    orderState(state){
        return ({paied_at,express_sn}) => {
            if(paied_at>0 && express_sn){
                return '已发货';
            } else if(paied_at>0){
                return '待发货';
            } else{
                return '待付款';
            }
        }
    }
};

const mutations = {
    order_state(state,payload){
        for(let[key,val] of Object.entries(payload)){
            state[key] = val;
        }
    },
    order_delete(state,payload){
        const index = state.listing.findIndex(item => item.id==payload);
        state.listing.splice(index,1)
    }
};

const actions = {
    order_listing({commit,state}){
        if(state.listing.length) return Promise.resolve(state.listing);
        return new Promise((res,rej) => {
            axios.get('orders').then(ret => {
                commit('order_state',{listing:ret.data});
                res(ret.data);
            }).catch(err => rej(err.data));
        })
    }
};

export default {state,getters,mutations,actions};
