<template>
    <div class="footer">
        <div>{{message}}</div>
    </div>
</template>
<script>
export default {
    name:"footerNav",
    data(){
        return{
            message:'© 2009－2019 all rights reserved 有限公司'
        }
    }
}
</script>
<style scoped>
.footer{
    position: fixed;
    right:0;
    bottom: 0;
    width: 100%;
}
.footer div{
    padding:10px;
    line-height: 20px;
    background-color: #324057;
    color: #fff;
    text-align: center;
}
</style>


