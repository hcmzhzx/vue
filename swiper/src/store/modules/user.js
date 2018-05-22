import axios from '../../assets/js/axios'

const state = {
    info:null
};

const getters = {

};

const mutatiions = {
    user_state(state,payload){
        for(let[key,val] of Object.entries(payload)){
            state[key] = val;
        }
    }
};

const actions = {
    user_info({commit,state}){
        if(state.info!==null) return Promise.resolve(state.info);
        return new Promise((res,rej) => {
            axios.get('users/info').then(ret => {
                commit('user_state',{info:ret.data});
                res(ret.data);
            }).catch(err => rej(err.data));
        })
    }
};

export default {state,getters,mutatiions,actions};
