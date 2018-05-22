<template>
    <div id="app">
        <div class="container">
            <my-header></my-header>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
        <!--组件复用-->
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <router-view name="guide"></router-view>
                </div>
                <div class="col-sm-12 col-md-4">
                    <router-view name="delivery"></router-view>
                </div>
                <div class="col-sm-12 col-md-4">
                    <router-view name="history"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from './components/header';

export default {
    name: 'App',
    components:{
        myHeader
    }
}
</script>
