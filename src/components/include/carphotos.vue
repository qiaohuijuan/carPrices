<template>
    <div class="car-img">
        <div class="tit">
            <p data-hover="hover" @click="ColorPage()"><span>颜色</span></p>
            <p data-hover="hover" @click="CarType()"><span><em>车款</em></span></p>
        </div> 
        <div class="carImgs">
            <ul class="img-default" v-for="(item,ind) in list" :key="ind">
                <li v-for="(val,key) in item.List" :key="key" v-if="key==0">
                    <img :style="`background-image: url(${val.Url.replace(/\{0\}/,'3')})`"/>
                    <div @click="clickAll(item.Id)">
                            <p>{{item.Name}}</p>
                            <p>{{item.Count}}></p>
                    </div>
                </li>  
                <li v-else>
                    <img :style="`background-image: url(${val.Url.replace(/\{0\}/,'3')})`" alt="">
                </li>
            </ul>
        </div> 
        <div v-if="showDetail" class="img-list" @scroll="scrollAll">
           <ul ref="Oul">
                <li v-for="(val,key) in categoryList" :key="key" >
                    <img  @click="clickSwiper(key)" :style="`background-image: url(${val.Url.replace(/\{0\}/,'3')})`"/>
                </li> 
           </ul>
        </div>
        <div v-if="isShow" class="showBig" @click="hideSwiper">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(val,key) in categoryList" :key="key">
                    <img :src="`${val.Url.replace('{0}',3)}`"/>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
               
            </swiper>
        </div>
       
    </div> 
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
    data() {
      return {
            id:this.$route.query.id,
            swiperOption: {
                autoplay: 1000,
                direction : 'horizontal',
                pagination : '.swiper-pagination',
                paginationClickable :true,
                cancelable:false
           }
       }
    },
    computed: {
        ...mapState({
            list: state=>{
                return state.Index.list
            },
            categoryList: state=>{
                return state.Index.categoryList
            },
            showDetail: state=>state.Index.showDetail,
            isShow: state=>state.Index.isShow
        }),
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        ...mapActions({
            getImgList: 'getImgList',
            getCategoryImageList: 'getCategoryImageList'
        }),
        ...mapMutations({
            showAll: 'showAll',
            showSwiper: 'showSwiper'
        }),
        clickAll(id){
            this.showAll(id);
            this.getCategoryImageList(id);
        },
        hideSwiper(e){
            if(e.target==e.currentTarget){
                 this.showSwiper(false)
            }
        },
        ColorPage(){
           this.$router.push({path:'/colorpage',query:{id:this.id}})
        },
        CarType(){
           this.$router.push({path:'/cartype',query:{id:this.id}})
        },
        clickSwiper(index){
            this.showSwiper(true);
            this.swipe.slideTo(index);
        },
        scrollAll(e){
            if (this.fetchingAll){
                return;
            }
            let scrollHeight = this.$refs.Oul.getBoundingClientRect().height - window.innerHeight;
            let current = e.target.scrollTop;
            if (current > (scrollHeight-20)){
                // 加载下一页数据
                this.fetchingAll = true;
                this.getCategoryImageList({
                    cb: ()=>{
                        this.fetchingAll = false
                    }
                });
            }
        }
    },
    mounted(){
        this.getImgList();
        this.fetchingAll = false;
    },
    components: {
        swiper,
        swiperSlide
  }
}
// export default {
//   name: "",
//   data() {
//     return {
//       imgsData: [],
//       ImgsList:[],
//       showflag:false,
//       id: this.$route.query.id,
//       page:1,
//       ImageID:''
//     };
//   },
//   mounted() {
//     this.getImgs();
//     this.fetchAll = false;
//   },
//   methods: {
//     getImgs() {
//       let $id = this.id;
//       fetch(
//         "https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" + $id
//       ).then(res => {
//         res.json().then(body => {
//           this.imgsData = body.data;
//         });
//       });
//     },
//     scrollAll(e){
//         if(this.fetchAll){
//            return;
//         }
//        let scrollHeight = this.$refs.Oul.getBoundingClientRect().height-window.innerHeight;
//      let current = e.target.scrollTop;
//      let top =scrollHeight-current;
//        if(top<=20){
//            this.page++;
//            this.fetchAll = true;
//            this.getImgList(this.id,this.ImageID,this.page)
//        }
//     },
//     getImgList(SerialID,ImageID,i){

//         this.showflag = true;
//         this.ImageID = ImageID;
//         // if(val){
//         //     this.maxLength=val.Count;
//         //     //this.changeImageID(imgmess.Id);
//         // } 
//         let time = new Date().getTime();
//         let URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&Page=${i}&PageSize=30&_${time}`
//         if(this.ColorID&&this.CarTypeID){
//             URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&ColorID=${ColorID}&CarID=${CarTypeID}&Page=${i}&PageSize=30&_${time}`
//         }else if(this.CarTypeID){
//             URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&CarID=${CarTypeID}&Page=${i}&PageSize=30&_${time}`
//         }else if(this.ColorID) {
//             URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&ColorID=${ColorID}&Page=${i}&PageSize=30&_${time}`
//         }
//         fetch(URL).then(res=>{
//             res.json().then(body=>{
//                 this.ImgsList=body.data.List;
//                 // setTimeout(()=>{
//                 //     if(this.mySwiper==null){
//                 //         this.mySwiper =  new Swiper(".swiper-container",{
//                 //       })
//                 //     }else{
//                 //       this.mySwiper.update(true)
//                 //     }
//                 // })
//             })
//         })
//     }
//   }
// };
 </script>

<style lang="">
@import url("../../../static/css/carphoto.css");
</style>