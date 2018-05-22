<template>
   <div id="home">
      <div id="row" class="col-sm-12 text-center">
         <div class="background">
            <h1>欢迎大家品尝</h1>
            <h2>这里有你喜欢的东西</h2>
            <button @click="goTo" class="btn btn-success">Let's order</button>
         </div>
      </div>
   </div>
</template>
<script>
export default{
   name: 'home',
   methods: {
      goTo(){

      }
   }
}
</script>

<style scoped>
   #home {background: url("../assets/logo.png") no-repeat center;height: 85vh;padding: 10%;}
   h1, h2 {margin: 6%;}
   .background {background: #ddd;opacity: .8;max-width: 70vw;margin: 0 auto;padding: 20px 0;}
</style>
