<template>
   <div id="register">
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
                     <div class="form-group">
                        <label>确认密码</label>
                        <input type="password" class="form-control" v-model="confirmPassword">
                     </div>
                     <button type="submit" class="btn btn-block btn-success">注册</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default{
   name: "register",
   data(){
      return {
         email: "",
         password: "",
         confirmPassword: ""
      }
   },
   methods: {
      onsubmit(){
         if (this.password === this.confirmPassword && this.password != "" && this.confirmPassword != "") {
            const formData = {
               email: this.email,
               password: this.password,
               confirmPassword: this.confirmPassword
            }
            this.$http.post("/users.json", formData).then(res => this.$router.push({name:"login"}));
         } else {
            alert("密码不一致");
         }
      }
   }
}
</script>
