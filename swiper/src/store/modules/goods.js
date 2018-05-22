import axios from '../../assets/js/axios'

const state = {
    listing:[]
};

const getters = {
    findGoodsById(state){
        return (id)=>{
            return state.listing.find(item=>item.id==id);
        }
    }
};

const mutations = {
    goods_state(state,payload){
        for(let[key,value] of Object.entries(payload)){
            state[key] = value;
        }
    }
};

const actions = {
    goods_listing({commit,state}){
        if(state.listing.length) return Promise.resolve(state.listing);

        return new Promise((res,rej)=>{
            axios.get('goods',{params:{state:1}}).then(ret=>{
                commit('goods_state',{listing:ret.data});
                res(ret.data);
            }).catch(err=>rej(err.data));
        });
    }
};

export default {state,getters,mutations,actions};
