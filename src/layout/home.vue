<template>
    <div class="home">
        <head-nav></head-nav>
        <div class="left-fixed-right-auto">
            <left-menu></left-menu>
            <div class="content_page">
                <div class="content">
                    <bread></bread>
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <footerNav></footerNav>
    </div>
</template>
<script>
import HeadNav from './headNav.vue';
import LeftMenu from './leftMenu.vue';
import FooterNav from './footerNav.vue';
import Bread from './bread.vue';

export default {
    name:'Home',
    components:{
        HeadNav,LeftMenu,FooterNav,Bread
    },
}
</script>
<style scoped>
    .content_page{
        position: fixed;
        top:71px;
        bottom: 40px;
        left: 180px;
        right: 0;
        padding:10px 20px;
        background: #FFF;
        overflow:auto;
    }
     .content{
       width:100%;
       height:100%;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>

