<template>
    <div id="feedback" class="flexv wrap">
        <!--头部-->
        <div class="flex center head">
            <a href="javascript:;" class="flex center xg xg-left" @click="$router.go(-1)"></a>
            <h1 class="flexitem center">我的反馈</h1>
            <a href="javascript:;" class="flex center xg xg-service servicebtn" @click="contact=true"></a>
        </div>
        <form class="report-text-area">
            <div class="text-input-wrap">
                <textarea name="" id="tip_content" class="text-input" cols="30" rows="10" placeholder="请输入你想吃的水果~"
                          v-model="feedback"></textarea>
            </div>
            <button type="button" id="button-alt" @click="submit()" :class="{btn:this.feedback.length>0}">提交</button>
        </form>
        <!--弹窗-->
        <my-contact :show.sync="contact"></my-contact>
    </div>
</template>
<script>
    import myContact from './contact.vue'

    export default{
        name: 'feedback',
        components: {
            myContact
        },
        data(){
            return {
                feedback: '',
                contact: false
            }
        },
        methods: {
            submit(){
                this.$http.post('feedback', {feedback: this.feedback}).then(ret => {
                    this.$layer.open({
                        content: ret.mag,
                        skin: 'msg',
                        time: 2
                    });
                    this.$router.go(-1);
                });
            }
        }
    }
</script>
