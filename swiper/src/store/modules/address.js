import axios from '../../assets/js/axios'

const state = {
    listing:[]
};

const getters = {

};

const mutations = {
    address_state(state,payload){
        for(let[key,val] of Object.entries(payload)){
            state[key] = val;
        }
        /*const obj = {a: 5, b: 7, c: 9};
        for (const [key, value] of Object.entries(obj)) {
            console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
        }*/
    },
    address_append(state,payload){
        state.listing.push(payload);
        sessionStorage.setItem("id",state.listing.length);
    },
    address_upadte(state,payload){
        // 查找匹配数组
        const perm = state.listing.find(perm=>perm.id==payload.id);
        for(let[key,value] of Object.entries(payload)){
            perm[key] = value;
        }
    }
};

const actions = {
    address_listing({commit,state}){
        if(state.listing.length) return Promise.resolve(state.listing);
        return new Promise((res,rej)=>{
            axios.get('address').then(ret=>{
                commit('address_state',{listing:ret.data});
                res(ret.data);
            }).catch(err=>rej(err.data));
        })
    }
};

export default {state,getters,mutations,actions};
