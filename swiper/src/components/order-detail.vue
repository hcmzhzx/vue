<template>
    <div id="orderdetails" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" @click="$router.go(-1)" class="flex center xg xg-left"></a>
                <div class="flexitem center">订单详情</div>
            </div>
            <div class="flexv">
                <!--待发货 已发货 交易成功-->
                <div class="between state">
                    <span class="flex center">{{orderState(order)}}</span>
                    <span class="flex center time">{{order.created_at}}</span>
                </div>
                <div class="around site">
                    <i class="flex center xg xg-location"></i>
                    <div class="flexitemv centerh message">
                        <div class="name">
                            <span>{{order.consignee}}</span>
                            <span>{{order.phone}}</span>
                        </div>
                        <div class="sites">{{order.address}}</div>
                    </div>
                </div>
            </div>
            <!--订单号-->
            <div class="martop padlft orderinfo">
                <div class="title number">订单号：<span>{{order.sn}}</span></div>
                <div class="flex centerv goods" v-for="goods in findGoodsByOrdersId(order.id)" :key="goods.id">
                    <div class="flexitemv cont">
                        <h2 class="flex">{{goods.goods_name}}</h2>
                        <div class="flex centerv base">
                            <i class="flex center xg xg-cooperate"></i>
                            <sapn class="flex">合作基地</sapn>
                        </div>
                        <div class="between price">
                            <div class="flex endv cost">
                                <span>&yen; {{goods.price}}</span>
                                <p>&yen; {{goods.market_price}}</p>
                            </div>
                            <div class="flex end">
                                <i>{{goods.attr_name}}</i>
                                <i>X {{goods.goods_name}}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <!--发货后-->
                <div class="flex endh rear" v-if="order.express_sn">
                    <a :href="`https://m.kuaidi100.com/index_all.html?type=${order.express}&postid=${order.express_sn}`" class="flex center look">查看物流</a>
                </div>
                <div class="between goodsreal">
                    <span>商品总额</span>
                    <span>&yen;{{order.amount}}</span>
                </div>
                <div class="between freight">
                    <span>运费</span>
                    <span>免运费</span>
                </div>
            </div>
            <div class="martop between sum">
                <span>合计</span>
                <span>&yen;{{order.amount}}</span>
            </div>
            <a href="javascript:;" @click="pay(order)" class="flex center delbtn" v-if="order.paied_at==0" style="background:#ff4100">去支付</a>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default{
        name:'orderdetails',
        created(){
        	  const orderPromise = this.$store.dispatch('order_listing');
        	  const goodsPromise = this.$store.dispatch("order_goods_listing");

        	  Promise.all([orderPromise,goodsPromise]).then(() => {
        	  	  const orderId = this.$route.query.id;
        	  	  this.order = this.findOrderById(orderId);
            });
        },
        computed:{
            ...mapGetters([
                'orderState','findOrderById','findGoodsByOrderId'
            ])
        },
        data(){
        	  return{
        	  	  order:{}
            }
        },
        methods:{

        }
    }
</script>

<style>

</style>
