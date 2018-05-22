<template>
    <div id="alert" :class="{show:visible==='visible'}" :style="{visibility: visible}">
        <div class="servicebox">
            <div class="flexv center service">
                <div class="qrcodebox">
                    <img :src="`${imgUrl}/qrcode/contact.jpg`" class="fitimg">
                </div>
                <p>长按识别二维码</p>
                <p>联系客服查询物流</p>
            </div>
            <a href="javascript:;" @click="hide()" class="flex center cancel">取消</a>
        </div>
    </div>
</template>
<script>
    import {YUN_URL} from '../assets/js/env';
    
    export default {
        props:['show'],   //接收来自父组件的数据
        data(){
            return {
                imgUrl:YUN_URL
            }
        },
        computed:{
            visible(){
                return this.show?'visible':'hidden';
            }
        },
        methods:{
            hide(){
                //当子组件需要更新 show 的值时，它需要显式地触发一个更新事件
                this.$emit('update:show',false);
            }
        }
    }
</script>
