<template>
   <div id="login">
      <div class="row mt-3">
         <div class="col-md-12 col-g-12">
            <div class="card">
               <div class="card-body">
                  <img src="../assets/logo.png" class="mx-auto d-block">
                  <form @submit.prevent="onsubmit">
                     <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" v-model="email">
                     </div>
                     <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" v-model="password">
                     </div>
                     <button type="submit" class="btn btn-block btn-success">登录</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default{
   name: "login",
   data(){
      return {
         email: "",
         password: ""
      }
   },
   // 组件内的守卫
   beforeRouteEnter: (to, from, next) => {
       next(vm => vm.$store.dispatch("setUser",null))
   },
   methods: {
      onsubmit(){
         this.$http.get("/users.json").then(res => {
            const data = res.data, users = []
            for (let key in data) {
               users.push(data[key])
            }
            // 实现过滤
            let result = users.filter((users) => {
               return users.email === this.email && users.password === this.password
            });
            // 判断 result 的长度是否大于0
            if (result != null && result.length > 0) {
               this.$store.dispatch("setUser",result[0].email)
               this.$router.push({name: "home"})
            } else {
               alert("账号或密码错误!")
               this.$store.dispatch("setUser",null)
            }
         })
      }
   }
}
</script>
