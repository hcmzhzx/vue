<template>
    <div id="newsite" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" @click="$router.go(-1)" class="flex center xg xg-left"></a>
                <h1 class="flexitem center">修改收货地址</h1>
            </div>
            <!--地址信息-->
            <form class="flexv padlft">
                <label class="around input">
                    <span class="flex centerv">收货人</span>
                    <input type="text" class="flexitem" placeholder="收货人姓名" v-model="address.consignee">
                </label>
                <label class="around input">
                    <span class="flex centerv">手机号码</span>
                    <input type="tel" class="flexitem" placeholder="配送员联系您的电话" maxlength="11" v-model="address.phone">
                </label>
                <label class="between input" style="align-items:center">
                    <span class="flex centerv">所在城市</span>
                    <v-distpicker :placeholders="placeholders" @selected="selectArea" :province="address.province" :city="address.city" :area="address.county"></v-distpicker>
                </label>
                <label class="around input site">
                    <span class="flex centerv">收货地址</span>
                    <input type="text" class="flexitem" v-model="address.address" placeholder="小区/写字楼">
                    <em class='flex center hint'></em>
                </label>
            </form>
            <div class="btnbox">
                <a href="javascript:;" class="flex center marbotm save" @click="save">保存收货信息</a>
            </div>
        </div>
    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'

    export default{
        name:'newsite',
        components:{
        	  VDistpicker
        },
        created(){
        	  this.$store.dispatch('address_listing').then(address => {
        	  	  const addressId = this.$route.params.id;
        	  	  const addr = address.find(val => {
        	  	  	  return val.id == addressId;
                });
                this.address = {...addr};
            })
        },
        data(){
        	  return {
        	  	  address:{},
                placeholders: {
        	  	  	  province: '省份',
                    city: '城市',
                    area: '地区'
                }
            }
        },
        methods:{
        	  save(){
        	  	  const address = this.address;
        	  	  /*this.$http.put(`address/${address.id}`.address).then(ret => {
        	  	  	  this.$store.commit('address_update',{...address});
        	  	  	  this.$router.go(-1);
                });*/
                this.$store.commit('address_update',address);
                this.$router.go(-1);
            },
            selectArea({province,city,area}){
                if(province.code)this.address.province = province.value;
                if(city.code)this.address.city = city.value;
                if(area.code)this.address.county = area.value;
            }
        }
    }
</script>

<style>
    .address>select{width:30%}
</style>
