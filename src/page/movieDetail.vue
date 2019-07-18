<template>
    <div v-if="movieInfo" class="movieinfo">
        <el-row>
            <el-col :span="18">
                <h2 class="movietitle">{{movieInfo.title}} {{movieInfo.original_title}} <span style="color:#888">({{movieInfo.year}})</span></h2>
                <el-row :gutter="40">
                    <el-col :span="4">
                        <img :src="movieInfo.images.small" alt="" class="moviepic">
                    </el-col>
                    <el-col :span="15" class="baseinfo">
                        <p><label class="label">导演：</label><router-link :to="{path:'/celebrity',query:{id:item.id}}" v-for="(item,index) in movieInfo.directors" :key="index">{{item.name}}</router-link></p>
                        <p><label class="label">编剧：</label><span v-for="(item,index) in movieInfo.writers" :key="index"><em v-if="index!=0"> / </em><router-link :to="{path:'/celebrity',query:{id:item.id}}">{{item.name}}</router-link></span></p>
                        <p><label class="label">主演：</label><span v-for="(item,index) in movieInfo.casts" :key="index"><em v-if="index!=0"> / </em><router-link :to="{path:'/celebrity',query:{id:item.id}}">{{item.name}}</router-link></span></p>
                        <p><label class="label">类型：</label><span v-for="(item,index) in movieInfo.genres" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                        <p><label class="label">制片国家/地区：</label><span v-for="(item,index) in movieInfo.countries" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                        <p><label class="label">语言：</label><span v-for="(item,index) in movieInfo.languages" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                        <p><label class="label">上映日期：</label><span v-for="(item,index) in movieInfo.pubdates" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                        <p><label class="label">片长：</label><span v-for="(item,index) in movieInfo.durations" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                        <p><label class="label">又名：</label><span v-for="(item,index) in movieInfo.aka" :key="index"><em v-if="index!=0"> / </em>{{item}}</span></p>
                    </el-col>
                    <el-col :span="5" class="ratewrap">
                        <h6 class="title">豆瓣评分</h6>
                        <div class="ratemain">
                            <span class="ratenum">{{movieInfo.rating.average}}</span>
                            <div>
                                <router-link :to="{}" class="pingnum">{{movieInfo.ratings_count}}人评价</router-link>
                            </div>
                        </div>
                        <div class="starwrap">
                            <p>5星<span class="progress" :style=progress(movieInfo.rating.details[5])></span>{{percent(movieInfo.rating.details[5])}}</p>
                            <p>4星<span class="progress" :style=progress(movieInfo.rating.details[4])></span>{{percent(movieInfo.rating.details[4])}}</p>
                            <p>3星<span class="progress" :style=progress(movieInfo.rating.details[3])></span>{{percent(movieInfo.rating.details[3])}}</p>
                            <p>2星<span class="progress" :style=progress(movieInfo.rating.details[2])></span>{{percent(movieInfo.rating.details[2])}}</p>
                            <p>1星<span class="progress" :style=progress(movieInfo.rating.details[1])></span>{{percent(movieInfo.rating.details[1])}}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div class="desccard">
            <h5 class="title">{{movieInfo.title}}的剧情简介</h5>
            <div>{{movieInfo.summary}}</div>
        </div>
        <div class="desccard">
            <h5 class="title">{{movieInfo.title}}的演职员</h5>
            <div></div>
        </div>
        <div class="desccard">
            <h5 class="title">{{movieInfo.title}}的短评<span>(全部 {{commentsTotal}} 条)</span></h5>
            <div class="duanping">
                <ul>
                    <li v-for="(item,index) in comments" :key="index" v-if="index<5">
                        <p><router-link class="username" :to="{}">{{item.author.name}}</router-link><span class="createtime">{{item.created_at}}</span><span class="fr useful">有用</span><span class="fr">{{item.useful_count}}</span></p>
                        <p class="content">{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="desccard">
            <h5 class="title">{{movieInfo.title}}的影评</h5>
            <div class="duanping">
                <ul>
                    <li v-for="(item,index) in reviews" :key="index" v-if="index<5">
                        <p><router-link class="username" :to="{}">{{item.author.name}}</router-link><span class="createtime">{{item.created_at}}</span><span class="fr useful">有用</span><span class="fr">{{item.useful_count}}</span></p>
                        <p class="content">{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'movieDetail',
    data(){
        return{
            movieId:this.$route.query.id,
            movieInfo:null,
            comments:[],//短评
            ratingnum:0,
            reviews:[],//影评
            commentsTotal:0
        }
    },
    created(){
        this.getDetail();
        this.getComments();
        this.getReviews();
    },
    computed:{
        percent(){
            return function(rate){
                return parseFloat(rate/(this.ratingnum)*100).toFixed(2)+'%'
            }
        },
        progress(){
            return function(rate){
                return 'width:'+parseInt(rate/(this.ratingnum)*70)+'px'
            }
        }
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
        getDetail(){
            var that=this;
            const loading=that.loading();
            console.log(that.movieId)
            axios.get(that.HOST+`/movie/subject/${that.movieId}`).then(res=>{
                if(res.status==200){
                    loading.close();
                    that.movieInfo=res.data;
                    let stars=that.movieInfo.rating.details;
                    for(let i in stars){
                        that.ratingnum=that.ratingnum+stars[i];
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getComments(){
            var that=this;
            const loading=that.loading();
            axios.get(that.HOST+`/movie/subject/${that.movieId}/comments`).then(res=>{
                if(res.status==200){
                    loading.close();
                    that.commentsTotal=res.data.total
                    that.comments=res.data.comments
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        getReviews(){
            var that=this;
            const loading=that.loading();
            axios.get(that.HOST+`/movie/subject/${that.movieId}/reviews`).then(res=>{
                if(res.status==200){
                    loading.close();
                    that.reviews=res.data.reviews
                }
            }).catch(err=>{
                console.log(err)
            })

        },
        sortKey(array,key){
            return array.sort(function(a,b){
                var x = a[key];
                var y = b[key];
                return ((x<y)?-1:(x>y)?1:0)
            })
        }
    }
}
</script>
<style scoped>
.fr{
    float: right;
}
em{
    font-style: normal;
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

