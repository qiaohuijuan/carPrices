<template>
    <div class="detailPage">
          <div class="img" @click="imgFn">
              <img :src="detailData.CoverPhoto"/>
              <span>{{detailData.pic_group_count}}张照片</span>
          </div>

          <div class="info">
            <p>
              {{detailData.market_attribute&&detailData.market_attribute.dealer_price}}
            </p>
            <p>指导价 {{detailData.market_attribute&&detailData.market_attribute.official_refer_price}}</p>
            <div class="action active flex-row"><button data-hover="hover" @click="askPrice">询问底价</button></div>
          </div>

          <div class="car-list">
            <div class="c-type">
                <span v-for="(val,ind) in yearList" :key="ind" @click="toggle(ind,val)" :class='{active:ind===number}'>{{val}}</span>
            </div> 
          <Yearcar :yearData="yearData" :toggle="toggle" />
        </div>

        <div data-hover="hover" class="bottom">
             <span>询问底价</span> 
             <span>本地经销商为你报价</span>
        </div>  
        <Dealer v-show="showflag" :Carprice="Carprice"/> 
     </div>
    
</template>

<script>
import Yearcar from "./yearcar";
import Dealer from './dealer';
export default {
  name: "",
  data() {
    return {
      detailData: [],
      yearList: [],
      number: 0,
      yearData: [],
      carData: [],
      carId:'',
      Carprice:[],
      showflag:false
    };
  },
  mounted() {
    this._skipDetail();
    this.toggle("全部");
  },
  methods: {
    _skipDetail() {
      let $id = this.$route.query.id;
      fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID="+$id).then(res => {
        res.json().then(body => {
          this.detailData = body.data;
          this.yearData = body.data.list;
          let yearList = ["全部"];
          let carList = [];
          body.data.list.forEach((item, ind) => {
            let year = item.market_attribute.year;
            if (yearList.indexOf(year) == -1) {
              yearList.push(year);
            }
            carList.push(item);
            this.yearList = yearList;
          });
          let sortCar = arr => {
            return arr.sort((a, b) => {
              if (a.exhaust < b.exhaust) {
                return -1;
              } else if (a.exhaust > b.exhaust) {
                return 1;
              } else {
                if (a.max_power < b.max_power) {
                  return -1;
                } else if (a.max_power > b.max_power) {
                  return 1;
                } else {
                  return b.inhale_type - a.inhale_type;
                }
              }
            });
          };
          carList = sortCar(carList);
          this.carData = carList;   
        });
      });
    },
    askPrice(){
        this.showflag = true;
        this.yearData.forEach((item)=>{
           this.carId = item.car_id
        })
        fetch(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${this.carId}&cityId=201`).then(res=>{
          res.json().then(body=>{
            this.Carprice = body.data
          })
        })
    },
    toggle: function(index, valyear) {
      this.number = index;
      let arrsort = this.carData.filter(item => {
        let year = item.market_attribute.year;
        if (valyear == "全部") {
          return this.carData;
        }
        return year == valyear;
      });
      this.yearData = arrsort;
    },
    imgFn(){
      let $id = this.$route.query.id;
      this.$router.push({path:'/carphotos',query:{id:$id}})
    }
  },
  components: {
    Yearcar,
    Dealer
  }
};
</script>

<style lang="">
@import url("../../../static/css/detail.css");
</style>