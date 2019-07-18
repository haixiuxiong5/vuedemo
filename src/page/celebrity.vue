<template>
    <div v-if="celebrityInfo" class="movieinfo">
        <el-row>
            <el-col :span="18">
                <h2 class="movietitle">{{celebrityInfo.name}} {{celebrityInfo.name_en}}</h2>
                <el-row :gutter="40">
                    <el-col :span="4">
                        <img :src="celebrityInfo.avatars.small" alt="" class="moviepic">
                    </el-col>
                    <el-col :span="15" class="baseinfo">
                        <p><label class="label">性别：</label><span>{{celebrityInfo.gender}}</span></p>
                        <p><label class="label">星座：</label><span>{{celebrityInfo.constellation}}</span></p>
                        <p><label class="label">出生日期：</label><span>{{celebrityInfo.birthday}}</span></p>
                        <p><label class="label">出生地：</label><span>{{celebrityInfo.born_place}}</span></p>
                        <p><label class="label">职业：</label><span v-for="(item,index) in celebrityInfo.professions" :key="index">{{item}}/ </span></p>
                        <p><label class="label">更多外文名：</label><span v-for="(item,index) in celebrityInfo.aka_en" :key="index">{{item}}/ </span></p>
                        <p><label class="label">家庭成员：</label><span></span></p>
                        <p><label class="label">im db编号：</label><span></span></p>
                        <p><label class="label">官方网站：</label><span>{{celebrityInfo.website}}/ </span></p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div class="desccard">
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'celebrity',
    data(){
        return {
            id:this.$route.query.id,
            celebrityInfo:null
        }
    },
    created(){
        this.getCelebrityInfo();
    },
    methods:{
        loading(){
            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            return loading;
        },
        getCelebrityInfo(){
            let that=this;
            const loading=that.loading();
            axios.get(that.HOST+`/movie/celebrity/${that.id}`).then(res=>{
                if(res.status==200){
                    loading.close();
                    console.log(res.data)
                    this.celebrityInfo=res.data;
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.fr{
    float: right;
}
.movieinfo{
    font-size: 14px;
    color: #393939;
}
.movieinfo a{
    color: #009cff;
    cursor: pointer;
}
.movietitle{
    padding:20px 0;
}
.moviepic{
    width: 100%;
}

.label{
    color: #666;
}
.ratewrap{
    border-left:1px solid #eee;
    font-size: 14px;
}
.ratewrap .title{
    color: #666;
}
.ratemain{
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 10px 0;
}
.ratemain .ratenum{
    padding-right: 10px;
    font-size: 22px;
}
.ratemain .pingnum{
    white-space: nowrap;
}
.starwrap{
    color: #999;
    font-size: 12px;
}
.starwrap .progress{
    display: inline-block;
    margin:0 7px;
    height: 4px;
    background-color: #f40;
}
.desccard{
    padding:20px 0;
}
.desccard .title{
    padding:10px 0;
    font-size: 20px;
    color: #009cff;
}
.duanping li{
    padding:14px 0;
    border-top: 1px solid #eee;
}
.duanping .username{
    margin-right: 5px;
}
.duanping .createtime{
    padding:0 5px;
    color: #999;
}
.duanping .content{
    margin-top: 10px;
}
.duanping .useful{
    padding-left: 6px;
    cursor: pointer;
    color: #009cff;
}
</style>


