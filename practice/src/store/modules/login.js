const state = {
   currentUser: null,  // 用户名
   isLogin:false       // 登录状态
}

const getters = {
   currentUser:state => state.currentUser,
   isLogin:state => state.isLogin
}

const mutations ={
   //更改用户的状态信息
   userStatu(state,user){
      if(user){
         console.log(1);
         state.currentUser = user
         state.isLogin = true
      } else {
         console.log(0);
         state.currentUser = null
         state.isLogin = false
      }
   }
}

const actions = {
   setUser({commit},user){
      commit("userStatu",user)
   }
}

export default {state,getters,mutations,actions}
