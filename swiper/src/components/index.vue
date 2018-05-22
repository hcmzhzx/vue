<template>
    <div id="home" class="flexv wrap">
        <div class="flexitemv mainbox">
            <!--头部-->
            <div class="flex center head">
              <h1 class="flexitem center">{{appName}}</h1>
            </div>
            <!--轮播-->
            <div class="flex banner">
                <swiper :options="swiperOption" ref="mySwiper" :not-next-tick="notNextTick">
                    <swiper-slide v-for="item in banners" :key="item.id">
                        <img :src="item.cover"/>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!--菜单-->
            <div class="around nav">
                <div class="flexv center">
                    <span class="flex"></span>
                    <em class="flex center">优选严选</em>
                </div>
                <div class="flexv center">
                    <span class="flex" style="background-position:-3.7rem 0;"></span>
                    <em class="flex center">安全检测</em>
                </div>
                <div class="flexv center">
                    <span class="flex" style="background-position:-7.3rem 0;"></span>
                    <em class="flex center">期付保障</em>
                </div>
            </div>
            <!--每日抢单-->
            <div class="flexv daily">
                <div class="flex center grab">每日抢单</div>
                <div class="flex centerv goods" v-for="item in goods" :key="item.id">
                    <div class="goods-img">
                        <img :src="item.covers[0]" class="fitimg">
                    </div>
                    <div class="flexitemv cont">
                        <h2 class="flex">{{item.goods_name}}</h2>
                        <p class="flex">{{item.title}}</p>
                        <div class="flex centerv base">
                            <i class="flex center xg xg-cooperate"></i>
                            <span class="flex">合作基地</span>
                        </div>
                        <div class="between price">
                            <div class="flex endv cost">
                                <span>&yen; {{item.price}}</span>
                                <p>&yen; {{item.market_price}}</p>
                            </div>
                            <div class="flex end">
                                <a href="javascript:;" @click="$router.push({name:'goods',params:{id:item.id}})" class="flex center btn">去抢单</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                          <!-- 此处是路由跳转到 name 页面-->
            <a href="javascript:;" @click="$router.push({name:'feedback'})" class="flexitem center none">
                <i class="xg xg-noitems"></i>
                <p>没有商品啦~告诉我你想吃啥?</p>
            </a>
        </div>
        <div class="around tabbars">
            <a href="javascript:;" @click="contact=false" :class="['flexv','center','home',{current:contact===false}]">
                <i class="flex center xg xg-classify-l"></i>
                <em class="flex center c  urrent">首页</em>
            </a>
            <a href="javascript:;" @click="contact=true" :class="['flexv','center','servicebtn',{current:contact}]">
                <i class="flex center xg xg-service"></i>
                <em class="flex center">联系客服</em>
            </a>
            <a href="javascript:;" class="flexv center mine" @click="$router.push({name:'user'})">
                <i class="flex center xg xg-mine"></i>
                <em class="flex center">我的</em>
            </a>
        </div>
        <!--弹窗  .sync 修饰符用于父子传值-->
        <my-contact :show.sync="contact"></my-contact>
    </div>
</template>
<script>
    import {APP_NAME} from '../assets/js/env';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import myContact from './contact.vue'
    
    export default{
        name:'home',
        components: {
            swiper,
            swiperSlide,
            myContact
        },
        created(){
            this.$store.dispatch('goods_listing').then(goods=>{
                this.goods = goods;
            });
            this.$store.dispatch('banner_listing').then(banners=>{
                this.banners = banners;
            });
        },
        data(){
            return {
                appName:APP_NAME,
                contact:false,
                goods:[],
                banners:[],
                notNextTick: true,
                swiperOption: {
                    loop: true,
                    autoplay:2500,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplayDisableOnInteraction:false,
                }
            }
        }
    }
</script>

<style>
  @import url("https://cdn.bootcss.com/Swiper/3.4.2/css/swiper.min.css");
  .swiper-slide>a{display:block;height: 100%}
  .swiper-slide>a>img{height: 100%;background-size: cover}
</style>
