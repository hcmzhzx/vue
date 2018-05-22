<template>
    <div id="mysite" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部 -->
            <div class="flex center head">
                <a href="javascript:;" @click="goShop()" class="flex center xg xg-left"></a>
                <h1 class="flexitem center">我的收货地址</h1>
            </div>
            <template v-if="address.length===0">
                <div class="flexitemv center sitebox">
                    <div class="flex center site-img"><i class="xg xg-site"></i></div>
                    <p class="flex center">您还没有收货地址，请新增地址</p>
                    <a href="javascript:;" @click="$router.push({name:'address-add'})" class="flex center sitebtn">新增收货地址</a>
                </div>
            </template>
            <div class="flex info" v-for="item in address" :key="item.id" @click="choose(item.id)">
                <div class="flexitemv centerh information">
                    <span class="flex name">{{item.consignee}}</span>
                    <span class="flex phone">{{item.phone}}</span>
                    <span class="flex address">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</span>
                </div>
                <div class="set">
                    <a href="javascript:;" @click.stop="$router.push({name:'address-edit',params:{id:item.id}})" class="xg xg-edit"></a>
                    <a href="javascript:;" class="flex center btn">去设置</a>
                </div>
            </div>
        </div>
        <a href="javascript:;" @click="$router.push({name:'address-add'})" class="flex center newsitebtn" v-if="address.length>0">新增收货地址</a>
    </div>
</template>
<script>
    export default{
        data(){
        	  return {
        	  	  address:[]
            }
        },
        created(){
            this.$store.dispatch('address_listing').then(address => {
                this.address = address;
            });
            if(this.address.length>0) {
                this.address = JSON.parse(sessionStorage.getItem("address"));
            }
        },
        methods:{
        	  choose(id){
              this.$store.commit("shop_address",id);
                this.$router.go(-1);
            },
            goShop(){
              this.$router.push({name:'shop'});
            }
        }
    }
</script>
