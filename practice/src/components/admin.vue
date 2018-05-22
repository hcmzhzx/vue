<template>
   <div id="admin" class="row">
      <div class="col-sm-12 col-md-8">
         <new-pizza></new-pizza>
      </div>
      <div class="col-sm-12 col-md-4">
         <h3 class="text-muted my-5">菜单</h3>
         <table class="table">
            <thead class="table table-default">
            <tr>
               <th>品种</th>
               <th>删除</th>
            </tr>
            </thead>
            <tbody v-for="item in getitems" :key="item.name">
            <tr>
               <td>{{item.name}}</td>
               <td>
                  <button @click="deletData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
               </td>
            </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>
<script>
import newPizza from './pizza';
export default{
   name: 'admin',
   data(){
      return {
         //getitems: []
      }
   },
   components: {
      newPizza
   },
   computed:{
      getitems(){  //获取vuex中数据
          //return this.$store.state.menuItems
          return this.$store.getters.getItems
      }
   },
   created(){
      fetch("https://wd0760838031xgmfir.wilddogio.com/menu.json").then(res => {
         return res.json()
      }).then(data => {
         let menuArry = [];
         for (let key in data) {
            data[key].id = key;
            menuArry.push(data[key])
         }
         //数据同步
         //this.getitems = menuArry
         this.$store.commit('setItems', menuArry)
      })
   },
   methods: {
      deletData(item){
         fetch(`https://wd0760838031xgmfir.wilddogio.com/menu/${item.id}/.json`, {
            method: "DELETE",
            headers: {'Content-type': 'application/json'}
         }).then(res => res.json()).then(data =>
            //this.$router.push({name: 'menu'})
            this.$store.commit('removeItems',item)
         )
      }
   }
}
</script>
