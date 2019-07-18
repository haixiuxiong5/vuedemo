<template>
    <div class="left-menu">
        <el-row>
            <el-col>
                <el-menu mode="vertical"
            theme="dark" class="el-menu-vertical-demo" :default-active="$route.path"  background-color="#324057"
            text-color="#fff"
            active-text-color="#ff6428">
                    <template v-for="(item,index) in lefeMenuList">
                    <!--表示 有二级菜单 -->
                        <el-submenu v-if="item.children  && item.children.length > 0 && !item.noDropdown" :index="item.name" :key="index+'-a'">
                            <template slot="title">
                                <i :class="'iconfont '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path"  :key="cindex+'-b'">
                                <el-menu-item 
                                    :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>

                        <!--表示 有一级菜单 noDropdown:true-->
                        <router-link :to="item.path" :key="index+'-c'">
                            <el-menu-item class="dropItem" 
                                v-if="item.children && item.children.length > 0 && item.noDropdown"  
                                :index="item.path"
                                >
                                <template slot="title" >
                                    <i :class="'iconfont '+item.icon"></i>
                                    <span class="23">{{item.name}}</span> 
                                </template>
                            </el-menu-item>
                        </router-link>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'leftMenu',
    data(){
        return{
            isDropdown: false,
            lefeMenuList:[
                {path:'/index',name:'首页',icon:'icon-home',noDropdown:true,
                    children:[
                        {path:'/index',name:'首页'},
                    ]
                },
                {path:'',name:'豆瓣电影',icon:'icon-xinxiliebiao',
                    children:[
                        {path:'/movie_hot',name:'最近热映'},
                        {path:'/movie_soon',name:'即将上映'},
                        {path:'/movie_top250',name:'top250'},
                    ]
                },
                {path:'',name:'信息管理',icon:'icon-gerenxinxi',
                    children:[
                        {path:'/infoManage/infoShow',name:'个人信息'},
                        {path:'/infoManage/infoModify',name:'修改信息'}
                    ]
                }
            ]
        }
    },
}
</script>
<style scoped>
.left-menu{
    position: fixed;
    top: 70px;
    left: 0;
    width: 180px;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.iconfont{
    margin-right: 5px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
.router-link-active li .el-submenu__title{
    color: #ff6428 !important;
}
</style>


