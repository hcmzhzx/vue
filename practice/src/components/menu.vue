<template>
   <div id="Menu" class="row">
      <!--菜单-->
      <div class="col-sm-12 col-md-8">
         <table class="table">
            <thead class="thead-default">
            <tr>
               <th>尺寸</th>
               <th>价格</th>
               <th>加入</th>
            </tr>
            </thead>
            <tbody v-for="item in getitems" :key="item.name">
            <tr>
               <td><strong>{{item.name}}</strong></td>
            </tr>
            <tr v-for="option in item.options" :key="option.size">
               <td>{{option.size}}</td>
               <td>{{option.price}}</td>
               <td>
                  <button @click="addCar(item,option)" class="btn btn-sm btn-outline-success">+</button>
               </td>
            </tr>
            </tbody>
         </table>
      </div>
      <!--购物车-->
      <div class="col-sm-12 col-md-4">
         <div v-if="baskets.length>0">
            <table class="table">
               <thead class="thead-default">
               <tr>
                  <th>数量</th>
                  <th>品种</th>
                  <th>价格</th>
               </tr>
               </thead>
               <tbody v-for="item in baskets" :key="item.name">
               <tr>
                  <td>
                     <button @click="decrease(item)" class="btn btn-sm">-</button>
                     <span>{{item.quantity}}</span>
                     <button @click="increase(item)" class="btn btn-sm">+</button>
                  </td>
                  <td>{{item.name}}{{item.size}}</td>
                  <td>{{item.price * item.quantity}}</td>
               </tr>
               </tbody>
            </table>
            <p>总价:{{total + "RMB"}}</p>
            <button class="btn btn-success btn-block">提交</button>
         </div>
         <div v-else v-text="baskesText"></div>
      </div>
   </div>
</template>
<script>
export default{
   name: 'Menu',
   data(){
      return {
         baskets:[],
         baskesText:'购物车没有商品',
         //getitems: {}
      }
   },
   computed:{
      getitems(){  // 在 vuex 中获取数据
          return this.$store.getters.getItems
      },
      total(){
         let total = 0;
         for(let index in this.baskets){
             let individua = this.baskets[index];
             total += individua.quantity * individua.price
         }
         return total
      }
   },
   created(){
       this.fetchData()
   },
   methods:{
      fetchData(){
         this.$http.get('menu.json').then(res =>
            this.$store.commit('setItems',res.data)
         )
      },
      addCar(item,option){  // 添加购物车
         let basket = {
            name:item.name,
            size:option.size,
            price:option.price,
            quantity:1
         }
         if(this.baskets.length > 0){ // 过滤相同的
            let result = this.baskets.filter((basket) => {
                return (basket.name === item.name && basket.price === option.price)
            })
            if(result != null && result.length >0 ){
                result[0].quantity++
            } else {
                this.baskets.push(basket)
            }
         } else {
            this.baskets.push(basket)
         }
      },
      decrease(item){  // 购物车减
         item.quantity--
         if(item.quantity <=0 ){
            this.baskets.splice(this.baskets.indexOf(item,1))
         }
      },
      increase(item){ // 购物车加
         item.quantity++
      }
   }
}
</script>
