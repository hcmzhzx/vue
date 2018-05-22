<template>
    <div id="about">
        <div class="row mb-5">
            <div class="col-4">
                <!--导航-->
                <div class="list-group mb-5">
                    <router-link tag="li" class="nav-link" :to="{name:'history'}">
                        <a href="" class="list-group-item list-group-item-action">历史订单</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'contact'}">
                        <a href="" class="list-group-item list-group-item-action">联系我们</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'guide'}">
                        <a href="" class="list-group-item list-group-item-action">点餐文档</a>
                    </router-link>
                    <router-link tag="li" class="nav-link" :to="{name:'delivery'}">
                        <a href="" class="list-group-item list-group-item-action">快递信息</a>
                    </router-link>
                </div>
            </div>
            <div class="col-8">
                <!--导航对应内容-->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'about'
    }
</script>
