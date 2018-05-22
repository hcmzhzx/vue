<template>
    <div id="myindent" class="flexv wrap">
        <div class='flexitemv mainbox'>
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" class="flex center xg xg-left" @click="$router.go(-1)"></a>
                <h1 class="flexitem center">我的订单</h1>
                <a href="javascript:;" class="flex center xg xg-service servicebtn" @click="contact=true"></a>
            </div>
            <!--没有订单-->
            <div class="flexv center none" v-if="orders.length===0">
                <img src="../assets/img/indent_bj.png">
                <p>您还没有相关订单</p>
            </div>
            <!--有订单-->
            <div class="marbotm padlft orderinfo" v-for="order in orders" :key="order.id">
                <div class="flex end title">
                    <span class="flex center">{{orderState(order)}}</span>
                </div>
                <div class="flex centerv goods" v-for="goods in findGoodsByOrderId(order.id)" :key="`g${goods.id}`">
                    <div class="goods-img"><img :src="goods.goods_vover" class="fitimg"></div>
                    <div class="flexitemv cont">
                        <h2 class="flex">{{goods.goods_name}}</h2>
                        <div class="flex centerv base">
                            <i class="flex center xg xg-cooperate"></i>
                            <span class="flex">合作基地</span>
                        </div>
                        <div class="between price">
                            <div class="flex endv cost">
                                <span>&yen; {{goods.price}}</span>
                                <span>&yen; {{goods.market_price}}</span>
                            </div>
                            <div class="flex end">
                                <i>{{goods.attr_name}}</i>
                                <i>X {{goods.goods_num}}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="between money">
                    <div class="flex centerv">
                        <span>实付：</span><em>&yen; {{order.amount}}</em>
                    </div>
                    <div class="details">
                        <a href="javascript:;" @click="pay(order)" class="flex center btn">查看详情</a>
                    </div>
                </div>
            </div>
        </div>
        <!--弹窗-->
        <my-contact :show.sync="contact"></my-contact>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import myContact from './contact.vue'

    export default{
        name:'myindent',
        components: {
        	  myContact
        },
        computed:{
            ...mapGetters([
                'findGoodsByOrderId','orderState'
            ])
        },
        created(){
        	  const orderPromise = this.$store.dispatch('order_listing');
        	  const goodsPromise = this.$store.dispatch('goods_listing');

        	  Promise.all([orderPromise,goodsPromise]).then(ret => {
        	  	  this.order = ret[0];
            });
        },
        data(){
        	  return {
        	  	  orders:[],
                  contact:false
            }
        },
        methods:{
        	  pay(order){
                location.href=`/#/order/detail?id=${order.id}`;
            }
        }
    }
</script>
