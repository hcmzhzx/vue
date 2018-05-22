<template>
    <div id="order" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" @click="$router.push({name:'index'})" class="flex center xg xg-left"></a>
                <h1 class="flexitem center">填写订单</h1>
            </div>
            <!--地址-->
            <a href="javascript:;" @click="$router.push({name:'address-choose'})" :class="['around', 'site',{'show':address!=null}]">
                <i class="flex center xg xg-location"></i>
                <span class="flexitem center" v-if="address===null">请点击选择收货地址</span>
                <div class="flexitemv centerh message" v-else>
                    <div class="name">
                        <span>{{address.consignee}}</span>
                        <span>{{address.phone}}</span>
                    </div>
                    <div class="sites">
                        <span>{{address.province}}</span>
                        <span>{{address.city}}</span>
                        <span>{{address.county}}</span>
                        <span>{{address.address}}</span>
                    </div>
                </div>
                <i class="flex center xg xg-right"></i>
            </a>
            <!--订单信息-->
            <div class="martop padlft orderinfo">
                <div class="between title">
                    <div class="flex centerv">
                        <i class="flex"></i>
                        <span class="flex center">{{appName}}</span>
                    </div>
                </div>
                <template v-for="item in shopGoods">
                    <div class="flex centerv goods" v-if="item.attr==0">
                        <div class="goods-img">
                            <img :src="findGoodsById(item.id).covers[0]" class="fitimg">
                        </div>
                        <div class="flexitemv cont">
                            <h2 class="flex">{{findGoodsById(item.id).goods_name}}</h2>
                            <div class='flex center base'>
                                <i class="flex xg xg-cooperate"></i>
                                <span class="flex">合作基地</span>
                            </div>
                            <div class="between price">
                                <div class="flex endv cost">
                                    <span>&yen; {{findGoodsById(item.id).price}}</span>
                                    <p>&yen; {{findGoodsById(item.id).market_price}}</p>
                                </div>
                                <div class="flex end">
                                    <i></i>
                                    <i>x {{item.num}}</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex center goods" v-else>
                        <div class="goods-img">
                            <img :src="findGoodsById(item.id).covers[0]" class="fitimg">
                        </div>
                        <div class="flexitemv cont">
                            <h2 class="flex">{{findGoodsById(item.id).goods_name}}</h2>
                            <div class="flex center base">
                                <i class="flex center xg xg-cooperate"></i>
                                <span class="flex">合作基地</span>
                            </div>
                            <div class="between price">
                                <div class="flex endv cost">
                                    <span>&yen; {{findAttrById(item.attr).attr_price}}</span>
                                    <p>&yen; {{findAttrById(item.attr).attr_market_price}}</p>
                                </div>
                                <div class="flex end">
                                    <i>{{findAttrById(item.attr).attr_name}}</i>
                                    <i>x {{item.num}}</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="flex end total">合计：<em>&yen; {{amount}}</em></div>
            </div>
            <!--支付方式-->
            <div class="martop padlft payment">
                <div class="way">支付方式</div>
                <div class="between name" @click="payment='wechat'">
                    <div class="flex payname wechat">
                        <i class="xg xg-wechat"></i>
                        <span class="flex center">微信支付</span>
                    </div>
                    <i :class="['flex','center','xg',{'xg-hollow':payment!=='wechat'},{'xg-confirm':payment==='wechat'}]"></i>
                </div>
                <div class="between name" @click="payment='alipay'">
                    <div class="flex payname zfb">
                        <i class="xg xg-zfb"></i>
                        <span class="flex center">支付宝</span>
                    </div>
                    <i :class="['flex','center','xg',{'xg-hollow':payment!=='alipay'},{'xg-confirm':payment==='alipay'}]"></i>
                </div>
            </div>
        </div>
        <!--去支付-->
        <div class="between padlft checkou">
            <div class="flex center chk-box">
                <span>付款</span>
                <span class="sum">&yen; {{amount}}</span>
                <i> (为你节省{{new Number(marketAmount-amount).toFixed(1)}}元) </i>
            </div>
            <a href="javascript:;" :class="['flex','center','btn',{disabled:address===null}]" @click="shop()">去支付<i class="flex xg xg-rights"></i></a>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {APP_NAME} from '../assets/js/env'
    
    export default{
        name:'order',
        beforeCreate(){
            const goodsPromise = this.$store.dispatch('goods_listing');
            const attrPromise = this.$store.dispatch('attr_listing');
            
            Promise.all([goodsPromise,attrPromise]).then(ret=>{
                this.goods = ret[0];
                this.attrs = ret[1];
                this.shopGoods = this.$store.getters.shopGoods;
            });
            
            const addrId = this.$store.getters.shopAddress;
  
            if(addrId>0){
                this.$store.dispatch('address_listing').then(address => {
                    const addr = address.find(addr => {
                        return addr.id == addrId;
                    });
                    this.address = {...addr};
                })
            }
        },
        data(){
            return {
                goods:[],
                attrs:[],
                shopGoods:[],
                payment:'wechat',
                appName:APP_NAME,
                address:null
            }
        },
        computed:{
            ...mapGetters([
                'findGoodsById','findAttrById'
            ]),
            // 现价商品价格
            amount(){
                const amount = this.shopGoods.map(goods => {
                    const fee = goods.attr > 0 ? this.findAttrById(goods.attr).attr_price : this.findGoodsById(goods.id).price;
                    return fee * goods.num;
                }).reduce((sum,fee) => {
                    return sum += fee;
                }, 0);
                return amount.toFixed(1)
            },
            // 原价商品价格
            marketAmount(){
                return this.shopGoods.map(goods => {
                    const fee = goods.attr > 0 ? this.findAttrById(goods.attr).attr_market_price : this.findGoodsById(goods.id).market_price;
                    return fee * goods.num;
                }).reduce((sum, fee) => {
                    return sum += fee;
                }, 0);
            }
        },
        methods:{
            shop(){
                if(this.address === null){
                    this.$layer.open({
                        content:'请选择收货地址',
                        skin:'msg',
                        time:2
                    });
                    return;
                }
                if(this.payment == 'alipay'){
                    this.$layer.open({
                        content:'抱歉，暂不支持支付宝付款！',
                        skin:'msg',
                        time:2
                    });
                    return;
                }
                const payment = {
                    goods:this.shopGoods,
                    address:this.address.id
                };
//              this.$http.post('payment',payment).then((ret)=>{
                    this.$layer.open({
                        content:'支付成功',
                        skin:'msg',
                        time:2
                    });
                    this.$router.push({name:'order'});
//              })
            }
        }
    }
</script>
<style>
  #order .checkou a.btn.disabled{background: #aaa}
</style>
