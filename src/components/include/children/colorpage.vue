<template>
     <div class="colorpage">
        <div class="color">
           <p data-hover="hover" @click="back">全部颜色</p> 
            <div>
                <p class="c-type">
                    <span v-for="(val,key,index) in colorData" :key="index" @click="change(index,key)" :class="{active:index==num}">{{key}}</span>
                </p> 
                <ul>
                    <li v-for="(val,key) in colors" :key="key">
                        <span :style="`backgroundColor:${val.Value}`"></span>{{val.Name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
       return {
           colorData:[],
           colors:[],
           num:0
       }
    },
    mounted() {
        this.getColor()
    },
    methods:{
       getColor(){
            let $id = this.$route.query.id;
            fetch('https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID='+$id).then(res=>{
                res.json().then(body=>{
                     this.colorData = body.data;
                     for(let key in this.colorData){
                         this.colors = this.colorData[key]
                     }
                })
            })
       },
       change(ind,type){
           this.num = ind;
           let arr;
           for(let key in this.colorData){
               if(type==key){
                  arr =  this.colorData[key].filter((item)=>{
                       return item
                   })
               }
            }
            this.colors = arr
       },
       back(){
           this.$router.go(-1)
       }
    }
}
</script>

<style lang="">
body{
    margin:0;
    padding:0;
}
#app{
    width:100%;
    height:736px;
}
.colorpage{
    width:100%;
    height:100%;
}
.color{
    background: #f4f4f4;
    height: 100%;
    width: 100%;
}
.color>p{
    margin: .15rem 0;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}
.c-type {
    margin-top: .15rem;
    padding-left: .2rem;
    font-size: .3rem;
    line-height: .76rem;
    height: .76rem;
    background: #fff;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.color ul {
    margin-top: .15rem;
    padding: 0 .2rem;
    overflow: hidden;
    background: #fff;
}
.c-type span{
    padding-right:.24rem;
}
.color ul li:nth-child(odd) {
    margin-right: .2rem;
}
.color ul li {
    list-style:none;
    float: left;
    width: 3rem;
    font-size: .32rem;
    line-height: .68rem;
    border: 1px solid #3aacff;
    box-sizing: border-box;
    margin: .2rem 0;
    border-radius: .05rem;
}
.color ul li span {
    display: inline-block;
    margin-right:.2rem;
    width: .4rem;
    height: .4rem;
    margin-left: .2rem;
    vertical-align: -12%;
    background: #fe9210;
    box-sizing: border-box;
    border: 1px solid #818181;
}
.color ul li span.active{
    color:skyblue;
}
</style>