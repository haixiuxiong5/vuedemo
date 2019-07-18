<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class="logo-container">豆瓣电影</el-col>
            <div class="userinfo">
                <img src="../assets/logo.png" alt="" class="avatar">
                <div class="username">aa</div>
                <div class="useroperate">
                    <el-dropdown>
                        <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item divided>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-row>
    </header>
</template>
<script>
export default {
    name:'headNav',
    data(){
        return {}
    }
}
</script>
<style scoped>
    .head-nav{
        height: 70px;
        width: 100%;
        padding:0 20px;
        box-sizing: border-box;
        background-color: #00173d;
        color: #fff;
    }
    .logo-container{
        min-width: 300px;
        line-height: 70px;
    }
    .userinfo{
        float: right;
        line-height: 70px;
        text-align: right;
    }
    .userinfo .avatar{
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .userinfo .username{
        display: inline-block;
    }
    .useroperate{
        display: inline-block;
        cursor: pointer;
    }
    .useroperate .el-dropdown{
        color: #fff;
    }
</style>


