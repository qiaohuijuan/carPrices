<template>
    <div class="type">
        <p @click="back">全部车款</p> 
        <div>
            <div class="c-type">
                <span v-for="(val,key) in yearList" :key="key" @click="change(key,val)" :class="{active:key==num}">{{val}}</span>
            </div> 
            <div>
                <div class="c_detail" v-for="(val,key) in carData" :key="key">
                    <p>{{val.exhaust_str}}/{{val.max_power_str}}{{val.inhale_type}}</p> 
                    <ul class="c_list">
                        <li>
                                <p>{{val.market_attribute.year}}款{{val.car_name}}</p> 
                                <p>{{val.horse_power}}马力{{val.gear_num}}档</p> 
                                <p>
                                    <span>指导价{{val.market_attribute.official_refer_price}}</span> 
                                    <span>{{val.market_attribute.dealer_price_min}}起</span>
                                </p> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return {
            carData:[],
            cars:[],
            yearList:[],
            num:0
        }
    },
    mounted() {
        let $id = this.$route.query.id;
        fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID="+$id).then(res => {
            res.json().then(body=>{
                this.carData = body.data.list
                console.log(this.carData)
                let carList = [];
                let yearList = [];
                this.carData.forEach((item, ind) => {
                    let year = item.market_attribute.year;
                    if (yearList.indexOf(year) == -1) {
                         yearList.push(year);
                    }
                    carList.push(item);
                    this.yearList = yearList;
                })  
            })
        })
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
          console.log(this.carData)
    },
    methods:{
        back(){
            this.$router.back(1)
        },
        change(ind,type){
           this.num = ind;
        //    let arr;
        //    for(let key in this.carData){
        //        if(type==key){
        //           arr =  this.carData[key].filter((item)=>{
        //                return item
        //            })
        //        }
        //     }
        //     this.cars = arr
       }
    }

}
</script>

<style lang="">
.type{
    width:100%;
    height:100%;
    background: #f4f4f4;
}
.type>p {
    margin: .15rem 0;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
}
.type ul li {
    margin: 0 .2rem;
    padding: .28rem .06rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    height: 1.25rem;
    line-height: 1;
}
.type ul li p:first-child {
    font-size: .3rem;
}
.car-list ul li p:first-child {
    font-size: .3rem;
    line-height: 1;
    color: #3d3d3d;
}
.car-list ul li p:nth-child(2) {
    color: #bdbdbd;
    font-size: .26rem;
}
.car-list ul li p:nth-child(3) {
    text-align: right;
    padding-bottom: .1rem;
    font-size: .24rem;
    color: #818181;
}
.car-list ul li p:nth-child(3) span:nth-child(2) {
    font-size: .3rem;
    color: #ff2336;
    margin-left: .1rem;
}
</style>