<template>
   <div id="myheader">
      <header>
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="/" class="navber-brand">点餐系统</a>
            <ul class="navbar-nav">
               <!--<li class="nav-item"><router-link tag="div" to="/" class="nav-link">主页</router-link></li>-->
               <!--<li class="nav-item"><router-link :to="homelink" class="nav-link">主页</router-link></li>-->
               <li class="nav-item"><router-link :to="{name:'home'}" class="nav-link">主页</router-link></li>
               <li class="nav-item"><router-link :to="{name:'menu'}" class="nav-link">菜单</router-link></li>
               <li class="nav-item"><router-link :to="{name:'admin'}" class="nav-link">管理</router-link></li>
               <li class="nav-item"><router-link :to="{name:'about'}" class="nav-link">关于我们</router-link></li>
            </ul>

            <ul class="navbar-nav ml-auto">
               <li><router-link :to="{name:'login'}" v-show="!isLogin" class="nav-link">登录</router-link></li>

               <li class="nav-link">{{currentUser}}</li>
               <li><router-link :to="{name:'login'}" v-show="isLogin" class="nav-link">[退出]</router-link></li>

               <li><router-link :to="{name:'register'}" v-show="!isLogin" class="nav-link">注册</router-link></li>
            </ul>
         </nav>
      </header>
   </div>
</template>
<script>
export default{
   name: 'myheader',
   data(){
      return {
         //homelink:'/'
      }
   },
   computed:{
      currentUser(){
         return this.$store.getters.currentUser
      },
      isLogin(){
         return this.$store.getters.isLogin
      }
   }
}
</script>
