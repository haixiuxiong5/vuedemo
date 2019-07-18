<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="infinite-list-wrapper">
                    <ul class="movielist" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disabled">
                        <li class="movieitem" v-for="(item,index) in movie_hot" :key="index" @click="goMovieDetail(item)">
                            <img :src="item.images.small" width="100%" alt="">
                            <p>{{item.title}}</p>
                        </li>
                    </ul>
                    <p v-if="loading" style="text-align:center;">加载中...</p>
                    <p v-if="noMore" style="text-align:center;">没有更多了</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"movieTop",
    data(){
        return{
            movie_hot:[],
            count:10,
            start:0,
            loading:false,
            noMore:false
        }
    },
    computed: {
      disabled () {
        return this.loading || this.noMore
      }
    },
    created(){
        let that=this;
        that.loadMore();
    },
    
    methods:{
        loadMore(){
            let that=this;
            that.start=that.movie_hot.length;
            that.loading=true;
            setTimeout(()=>{
                axios.get(that.HOST+`/movie/top250?start=${that.start}&count=${that.count}`).then(response=>{
                    if(response.status==200){
                        if(response.data.subjects.length>0){
                            that.movie_hot=that.movie_hot.concat(response.data.subjects);
                            that.loading=false;
                            console.log(response.data.subjects);
                        }else{
                            that.loading=false;
                            that.noMore=true;
                            console.log(response.data.subjects);
                        }
                    }
                });
            },1000)
        },
        goMovieDetail(e){
            console.log(e.id);
            this.$router.push({
                path:`/movie_detail`,
                query:{
                    id:e.id
                }
            })
        }
    }
}
</script>
<style scoped>
    .movielist{
        overflow: hidden;
    }
    .movieitem{
        float: left;
        width: 240px;
        margin-bottom:20px;
        background-color: #fff;
        line-height: 1.6;
        text-align: center;
        font-size: 14px;
    }
    .movieitem img{
        margin:0 auto;
        width: 120px;
        height: 170px;
        object-fit: cover;
    }
</style>