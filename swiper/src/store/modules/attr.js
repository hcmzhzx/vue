import axios from '../../assets/js/axios'

const state = {
  listing:[]
};

const getters = {
    findAttrById(state){
        return(id) => {
            return state.listing.find(item => item.id==id);
        }
    }
};

const mutations = {
    attr_state(state,payload){
        for(let[key,val] of Object.entries(payload)){
            state[key] = val;
        }
    }
};

const actions = {
    attr_listing({commit,state}){
        if(state.listing.length) return Promise.resolve(state.listing);
        return new Promise((res,rej) => {
            axios.get('attrs').then(ret => {
                commit('attr_state',{listing:ret.data});
                res(ret.data);
            }).catch(err=>rej(err.data));
        })
    }
};

export default {state,getters,mutations,actions};
