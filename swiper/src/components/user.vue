<template>
    <div id="mind" class="flexv wrap">
        <div class='flexitemv mainbox'>
            <div class="flexv center user">
                <div class="flex user-img">
                    <img :src="user.head_img" v-if="user.head_img" class="fitimg">
                    <img :src="`${imgUrl}/logo.jpg`" v-else class="fitimg">
                </div>
                <div class='flex center user-name'>{{user.user_name}}</div>
            </div>
            <div class="martop padlft user-mesge">
                <a href="javascript:;" @click="$router.push({name:'order'})" class="flex centerv between">
                    <div class="flex center text">
                        <i class="flex xg xg-indent"></i>
                        <span class="flex">我的订单</span>
                    </div>
                    <i class="flex center xg xg-right"></i>
                </a>
                <a href="javascript:;" @click="$router.push({name:'address'})" class="flex centerv between">
                    <div class="flex center text">
                        <i class="flex xg xg-site"></i>
                        <span class="flex">我的地址</span>
                    </div>
                    <i class="flex center xg xg-right"></i>
                </a>
            </div>
        </div>
        <div class="around tabbars">
            <a href="javascript:;" @click="$router.push({name:'index'})" class="flexv center home">
                <i class="flex center xg xg-classify"></i>
                <em class="flex center current">首页</em>
            </a>
            <a href="javascript:;" @click="contact=true" :class="['flexv','center','servicebtn',{current:contact}]">
                <i class="flex center xg xg-service"></i>
                <em class="flex center">联系客服</em>
            </a>
            <a href="javascript:;" @click="contact=false" class="flexv center mine current">
                <i class="flex center xg xg-mine-l"></i>
                <em class="flex center">我的</em>
            </a>
        </div>
        <!--弹窗-->
        <my-contact :show.sync="contact"></my-contact>
    </div>
</template>
<script>
    import myContact from './contact.vue'
    import {YUN_URL} from '../assets/js/env'

    export default{
        name: 'mind',
        components: {
            myContact
        },
        created(){
            /*this.$store.dispatch('user_info').then(user => {
             this.user = user;
             })*/
        },
        data(){
            return {
                contact: false,
                imgUrl: YUN_URL,
                user: {
                    head_img: '',
                    user_name: ''
                }
            }
        }
    }
</script>

<style>

</style>
