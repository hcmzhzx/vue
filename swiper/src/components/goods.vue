<template>
    <div id="products" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
                <a href="javascript:;" class="flex center xg xg-left" @click="$router.push({name:'index'})"></a>
                <h1 class="flexitem center">{{goods.goods_name}}</h1>
            </div>
            <!--轮播展示-->
            <div class="felx center banner">
                <swiper :options="swiperOption" ref="mySwiper" :not-next-tick="notNextTick">
                    <swiper-slide v-for="cover in goods.covers" :key="cover" class="flex center">
                        <img :src="cover" class="felx fit">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!--商品详情  -->
            <div class="flexv details">
                <div class="box-goods border">
                    <div class="goods">
                        <p class="flex depict">{{goods.title}}</p>
                        <div class="between price">
                            <div class="cost">
                                <span>&yen;{{goods.price}}</span><i>&yen;{{goods.market_price}}</i>
                            </div>
                            <div class="flex endv inventory">库存：<i>{{goods.store_num}}</i></div>
                            <div class="flex endv sold">已售：<i>{{goods.sale_num}}</i>份</div>
                        </div>
                        <div class="between postage">
                            <div class="flex center now">新疆、内蒙古、青海、甘肃、宁夏 暂不发货</div>
                            <div class="flex center price">
                                <i class="flex center xg xg-postage"></i>
                                <span class="flex">特价包邮</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--商品参数-->
                <div class="box-goods">
                    <div class="flex center referral">商品参数</div>
                    <ul class="referral-text">
                        <li v-for="attr in goods.attrs">{{attr.name}}：{{attr.val}}</li>
                    </ul>
                </div>
                <!--图文详情-->
                <div class="flexv box-goods graphic">
                    <div class="flex center titl">图文详情</div>
                    <div class="graphic-img" v-html="goods.content"></div>
                </div>
              
            </div>
        </div>
        <!--购买按钮-->
        <div class="flex center buy-now" @click="buy">
            <a href="javascript:;" class="flex center">立即购买</a>
        </div>
        <!--弹窗-->
        <div :class="['flex','endv','alert',{showu:isShow}]">
            <form class="inventory">
                <a href="javascript:;" class="flex center xg xg-close close" @click="isShow=false"></a>
                <div class="flex goods">
                    <div class="flex center goods-img">
                      <img :src="goods.covers[0]" class="fitimg">
                    </div>
                    <div class="flexv name">
                        <h2>{{goods.goods_name}}</h2>
                        <span>&yen;{{realPrice}}</span>
                    </div>
                </div>
                <template v-if="prices.length>0">
                    <div class="box kg">
                        <p class="flex centerv tit">规格：</p>
                        <div class="flex kg-box">
                            <div :class="['flexv','kg-text',{current:realPrice==price.attr_price}]" v-for="price in prices" :key="price.attr_name" @click="chooseAttr(price)" style="text-align:center;line-height:3rem;">{{price.attr_name}}</div>
                        </div>
                    </div>
                </template>
                <div class="box time" v-if="goods.store_num==0">
                    <p class="flex centerv tit">配送时间：</p>
                    <div class="flex kg-box current">
                        <div class="flexv kg-text" style="line-height:3rem;text-align:center;">{{goods.deliver_desc}}</div>
                    </div>
                </div>
                <div class="between amount">
                    <div class="flex center">数量：</div>
                    <div class="around">
                        <span class="flex center" @click="minus()">-</span>
                        <span class="flexitem center">{{order.goods_num}}</span>
                        <span class="flex center" @click="plus()">+</span>
                    </div>
                </div>
                <div class="flex center buy-btn">
                    <a href="javascript:;" class="flex center" @click="go()">去结算</a>
                </div>
            </form>
            <div class="flexitem closeit"></div>
        </div>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {APP_URL} from '../assets/js/env'
    
    export default{
        name:'products',
        components:{
            swiper,
            swiperSlide
        },
        created(){
        	  this.$store.dispatch("goods_listing").then(ret=>{
        	  	  const goodsId = this.$route.params.id;
                this.goods = ret.find(goods=>goods.id==goodsId);
                
                this.$store.dispatch('attr_listing').then(ret=>{
                	  this.prices = ret.filter(price=>price.goods_id==goodsId);
                });
            })
        },
        data(){
        	  return {
        	  	  isShow:false,
                prices:[],
                goods:{
        	  	  	  id:'',
                    goods_name:'',
                    title:'',
                    attrs:[],
                    content:'',
                    market_price:0,
                    price:0,
                    covers:[],
                    deliver_desc:'',
                    store_num:0,
                    sale_num:0
                },
                order:{
        	  	  	  attr:0,
                    goods_num:1
                },
                notNextTick:true,
                swiperOption:{
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplayDisableOnInteraction:false
                }
            }
        },
        computed:{
        	  realPrice(){
        	  	  const attr = this.order.attr;
                if(attr>0){
                  return this.prices.find(price => price.id === attr)['attr_price'];
                }
                return this.goods.price;
            }
        },
        methods:{
        	  buy(){
        	  	  this.isShow = true;
            },
            chooseAttr(attr){
        	  	  this.order.attr = attr.id;
            },
            plus(){
            	  this.order.goods_num++;
            },
            minus(){
            	  if(this.order.goods_num <= 1) return false;
            	  this.order.goods_num--;
            },
            go(){
                this.$store.commit('shop_goods',[{
                    id:this.goods.id,
                    attr:this.order.attr,
                    num:this.order.goods_num
                }]);
                this.$router.push({name:'shop'});
            }
        }
    }
</script>
