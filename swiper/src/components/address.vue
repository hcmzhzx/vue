<template>
    <div id="mysite" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" @click="$router.go(-1)" class="flex center xg xg-left"></a>
                <h1 class="flexitem center">我的收货地址</h1>
            </div>
            <template v-if="address.length===0">
                <div class="flexitemv center sitebox">
                    <div class="flex center site-img"><i class="xg xg-site"></i></div>
                    <p class="flex center">您还没有收货地址，请新增地址</p>
                    <a href="javascript:;" @click="$router.push({name:'address-add'})" class="flex center sitebtn">新增收货地址</a>
                </div>
            </template>
            <div class="flex info" v-for="item in address" :key="item.id">
                <div class="flexitemv centerh information">
                    <span class="flex name">{{item.consignee}}</span>
                    <span class="flex phone">{{item.phone}}</span>
                    <span class="flex address">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</span>
                </div>
                <a href="javascript:;" @click="$router.push({name:'address-edit',params:{id:item.id}})" class="xg xg-edit"></a>
            </div>
        </div>
        <a href="javascript:;" v-if="address.length>0" @click="$router.push({name:'address-add'})" class="flex center newsitebtn">新增收货地址</a>
    </div>
</template>
<script>
    export default{
        name:'mysite',
        created(){
            this.$store.dispatch("address_listing").then(address => {
                this.address = address;
            });
            // this.address = sessionStorage.getItem("address");
        },
        data(){
        	  return {
        	  	  address:[]
            }
        }
    }
</script>

<style>

</style>
